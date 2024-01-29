import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewContainerRef
} from '@angular/core';
import * as settings from "../../config/settings.json";
import * as commands from "../../config/commands.json";
import {Logic} from "./logic";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {InputGroupModule} from "primeng/inputgroup";
import {InputTextModule} from "primeng/inputtext";
import {DeviceDetectorService} from "ngx-device-detector";
import {NgIf, NgStyle} from "@angular/common";
import {HeaderComponent} from "../header/header.component";
import {TranslateService} from "@ngx-translate/core";
import {AutocompleteService} from "../../services/autocomplete.service";
import {SharedDataService} from "../../services/shared-data.service";
import {HistoryService} from "../../services/history.service";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    InputGroupModule,
    InputTextModule,
    NgIf,
    HeaderComponent,
    NgStyle
  ],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.scss'
})
export class TerminalComponent implements OnInit, AfterViewChecked, AfterViewInit {
  public static isLightTheme = false;
  settings: any = (settings as any).default;
  commands: any = (commands as any).default;
  name = this.settings.terminal.username;
  logic: Logic = new Logic(this.translate, this.sharedData, this.http);

  isKeyboardOpen: boolean = false;
  isMobile!: boolean;
  isTablet!: boolean;

  ngOnInit(): void {

    document.body.setAttribute(
      'data-theme',
      TerminalComponent.isLightTheme ? 'light' : 'dark'
    );
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();


  }

  ngAfterViewChecked() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

  }

  ngAfterViewInit() {
    this.onEnter("about-me");
  }

  constructor(private renderer: Renderer2,
              private deviceService: DeviceDetectorService,
              private translate: TranslateService,
              private el: ElementRef,
              private http: HttpClient,
              public sharedData: SharedDataService,
              private autocompleteService: AutocompleteService,
              private viewRef: ViewContainerRef,
              private history: HistoryService) {
    try {
      translate.setDefaultLang(navigator.language.split('-')[0]);
    } catch (e) {
      translate.setDefaultLang('en');
    }

    translate.addLangs(['en', 'uk']);
  }


  openKeyboard() {
    let trigger = this.el.nativeElement.querySelector('.inp');
    trigger.focus();
  }


  checkAndSetScroll() {
    /*let terminalInput = this.el.nativeElement.querySelector('#bottom');
    terminalInput.scrollIntoView({block: "end"});*/
    if (this.isMobile || this.isTablet) {
      let terminalInput = this.el.nativeElement.querySelector('#keyboard-input');
      terminalInput.scrollIntoView({block: "end"});
    } else {
      let terminalInput = this.el.nativeElement.querySelector('#bottom');
      terminalInput.scrollIntoView({block: "end"});
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // console.log(event);
    switch (event.code) {
      case 'Backspace': {
        this.sharedData.message = this.sharedData.message.slice(0, -1);
        this.history.push(this.sharedData.message)
        break;
      }
      case 'Enter': {
        if (this.sharedData.message != '') {
          this.history.enter(this.sharedData.message)
        }
        this.onEnter(this.sharedData.message);
        break;
      }
      case 'Tab': {
        event.preventDefault();

        const parts = this.sharedData.message.split(' ');

        if (parts.length === 1) {
          // Если только одна часть, то это команда, пытаемся найти подходящую команду
          const bestMatch = this.autocompleteService.findBestMatch(parts[0], this.commands);

          if (bestMatch) {
            this.sharedData.message = bestMatch;
            this.history.push(this.sharedData.message);
          }
        } else if (parts.length >= 2) {
          let args: string = parts.slice(1).join(' ');
          const bestArgument = this.autocompleteService.findCommandArgument(parts[0], args, this.commands);


          if (bestArgument) {
            this.sharedData.message = parts[0] + ' ' + bestArgument;
            this.history.push(this.sharedData.message);
          }
        }
        break;
      }


      case 'ArrowUp': {
        event.preventDefault();
        this.sharedData.message = this.history.arrowUp();
        break
      }
      case 'ArrowDown': {
        event.preventDefault();
        this.sharedData.message = this.history.arrowDown();
        break
      }
      case 'Escape': {
        this.sharedData.message = '';
        break;
      }
      case 'Space': {
        this.sharedData.message += ' ';
        this.history.push(this.sharedData.message)
        break;
      }
      default: {
        if (event.code.startsWith("Key") || event.code.startsWith("Digit") || event.code === "Minus") {
          this.sharedData.message += event.key;
          this.history.push(this.sharedData.message)
        }
      }
    }
    this.checkAndSetScroll();
  }

  onEnter(message: string) {
    this.addPreviousCommand(message, this.renderer, this.el);

    this.logic.onEnterKey(message, this.renderer, this.el, this.viewRef);

    this.sharedData.message = '';
  }


  addPreviousCommand(message: string, renderer: Renderer2, el: ElementRef): void {
    let text = `<span style="color: var(--primary-color);">${this.name}</span>${this.settings.terminal.symbol} ${message}`;
    const divElement = this.renderer.createElement('div');

    divElement.className = 'previous-command';
    divElement.innerHTML = text;

    this.renderer.appendChild(this.el.nativeElement.querySelector(this.settings.design.parent), divElement);
    // this.renderer.appendChild(this.el.nativeElement.getElementById(this.settings.design.parent), divElement);
  }


}
