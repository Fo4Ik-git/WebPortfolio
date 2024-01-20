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
import * as jsonData from "../../config/settings.json";
import {Logic} from "./logic";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {InputGroupModule} from "primeng/inputgroup";
import {InputTextModule} from "primeng/inputtext";
import {DeviceDetectorService} from "ngx-device-detector";
import {NgIf} from "@angular/common";
import {HeaderComponent} from "../header/header.component";
import {TranslateService} from "@ngx-translate/core";
import {AutocompleteService} from "../../services/autocomplete.service";
import {SharedDataService} from "../../services/shared-data.service";


@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    InputGroupModule,
    InputTextModule,
    NgIf,
    HeaderComponent
  ],
  templateUrl: './terminal.component.html',
  styleUrl: './terminal.component.scss'
})
export class TerminalComponent implements OnInit, AfterViewChecked, AfterViewInit {
  public static isLightTheme = false;
  mobileMessage: string = '';
  settings: any = (jsonData as any).default;
  name = this.settings.terminal.username;
  logic: Logic = new Logic(this.translate, this.sharedData);
  commands = ['help', 'clear', 'change-theme', 'about-me'];
  history: string[] = ['about-me', 'test', ''];
  currentHistoryIndex = 1;

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
    this.sharedData.message = 'help';
  }

  constructor(private renderer: Renderer2,
              private deviceService: DeviceDetectorService,
              private translate: TranslateService,
              private el: ElementRef,
              public sharedData: SharedDataService,
              private autocompleteService: AutocompleteService,
              private viewRef: ViewContainerRef) {
    translate.setDefaultLang('en');
    try {
      translate.use(navigator.language.split('-')[0]);
    } catch (e) {
      translate.use('en');
    }
  }


  openKeyboard() {
    let trigger = this.el.nativeElement.querySelector('.inp');
    trigger.focus();
  }


  checkAndSetScroll() {
    /*let terminalInput = this.el.nativeElement.querySelector('#bottom');
    terminalInput.scrollIntoView({block: "end"});*/
    if (this.isMobile || this.isTablet) {
      window.scrollTo(0, document.body.scrollHeight);
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
        this.history.pop()
        this.history.push(this.sharedData.message)
        this.currentHistoryIndex = 1;
        break;
      }
      case 'Enter': {
        if (this.sharedData.message != '') {
          if (this.currentHistoryIndex != 1) {
            this.currentHistoryIndex = 1;
            this.history.pop()
            this.history.push(this.sharedData.message);
          }
          this.history.push('');
        }
        this.onEnter(this.sharedData.message);
        break;
      }
      case 'Tab': {
        event.preventDefault();
        let bestMatch = this.autocompleteService.findBestMatch(this.sharedData.message, this.commands);
        if (bestMatch) {
          this.sharedData.message = bestMatch;
          this.history.pop()
          this.history.push(this.sharedData.message)
          this.currentHistoryIndex = 1;
        }
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        let nextHistoryCommand = this.history.at(-1 * this.currentHistoryIndex - 1)
        if (nextHistoryCommand != undefined) {
          this.currentHistoryIndex += 1;
          console.log(this.currentHistoryIndex)
          console.log(this.history[this.currentHistoryIndex])
          this.sharedData.message = nextHistoryCommand;
        }
        break
      }
      case 'ArrowDown': {
        event.preventDefault();
        console.log(this.currentHistoryIndex)
        if (this.currentHistoryIndex == 1) {
          break;
        }
        let nextHistoryCommand = this.history.at(-this.currentHistoryIndex + 1)
        console.log(-this.currentHistoryIndex)
        console.log(this.history);
        console.log(nextHistoryCommand)
        if (nextHistoryCommand != undefined) {
          this.currentHistoryIndex -= 1;
          console.log(this.currentHistoryIndex)
          this.sharedData.message = nextHistoryCommand;
        }
        break
      }
      case 'Escape': {
        this.sharedData.message = '';
        break;
      }
      case 'Space': {
        this.sharedData.message += ' ';
        this.history.pop()
        this.history.push(this.sharedData.message)
        this.currentHistoryIndex = 1;
        break;
      }
      default: {
        if (event.code.startsWith("Key") || event.code.startsWith("Digit") || event.code === "Minus") {
          this.sharedData.message += event.key;
          this.history.pop()
          this.history.push(this.sharedData.message)
          this.currentHistoryIndex = 1;
        }
      }
    }
    this.checkAndSetScroll();
  }

  onEnter(message: string) {
    this.addPreviousCommand(message, this.renderer, this.el);

    this.logic.onEnterKey(message, this.renderer, this.el, this.viewRef);

    this.sharedData.message = '';
    this.mobileMessage = '';
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
