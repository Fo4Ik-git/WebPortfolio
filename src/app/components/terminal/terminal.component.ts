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
    message: string = '';
    mobileMessage: string = '';
    settings: any = (jsonData as any).default;
    name = this.settings.terminal.username;
    logic: Logic = new Logic(this.translate);
    commands = ['help', 'clear', 'change-theme', 'about-me'];

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
        let terminalInput = this.el.nativeElement.querySelector('#bottom');
        terminalInput.scrollIntoView({block: "end"});
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        // console.log(event.code);

        // console.log(event);
        switch (event.code) {
            case 'Backspace': {
                this.message = this.message.slice(0, -1);
                break;
            }
            case 'Enter': {
                this.onEnter(this.message);
                break;
            }
            case 'Tab': {
                event.preventDefault();
                let bestMatch = this.autocompleteService.findBestMatch(this.message, this.commands);
                if (bestMatch) {
                    this.message = bestMatch;
                }
                break;
            }
            case 'Space': {
                this.message += ' ';
                break;
            }
            default: {
                if (event.code.startsWith("Key") || event.code.startsWith("Digit") || event.code === "Minus") {
                    this.message += event.key;
                }
            }
        }
        this.checkAndSetScroll();
    }

    onEnter(message: string) {
        this.addPreviousCommand(message, this.renderer, this.el);

        this.logic.onEnterKey(message, this.renderer, this.el, this.viewRef);

        this.message = '';
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
