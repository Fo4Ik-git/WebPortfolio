import {Component, ElementRef, Renderer2} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import * as jsonData from "../../../config/settings.json";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-change-language',
  standalone: true,
  imports: [],
  templateUrl: './change-language.component.html',
  styleUrl: './change-language.component.scss'
})
export class ChangeLanguageComponent {
  settings: any = (jsonData as any).default;
  //TODO move this to a json file and load it from there
  helpMessage = '<div class="text-wrap">\n' +
    '        Available Commands:<br>\n' +
    '        - help: Show this help message.<br>\n' +
    '        - list: Display a list of available languages.<br>\n' +
    '        - language_code: Load translation file for the specified language.<br>' +
    '        </div>';

  constructor(private http: HttpClient) {
  }

  hub(attributes: string[], translate: TranslateService,
      renderer: Renderer2, el: ElementRef) {
    attributes.shift();

    let args;

    try {
      args = attributes[0].trim();
    } catch (e) {
      args = 'null';
    }

    let unknownCommand = `Unknown command '<span style="color: var(--error-color);">${args}</span>' use 'help' for more information`;
    let languageChanged = `Language changed to <span">${attributes[0]}</span>`;

    if (args === 'null') {
      this.addDivToInputGroup(unknownCommand, renderer, el);
      return;
    }

    const command = attributes[0].toLowerCase();
    switch (command) {
      case 'help': {
        this.addDivToInputGroup(this.helpMessage, renderer, el);
        return;
      }
      case 'list': {
        //TODO do it prettier
        this.addDivToInputGroup(translate.getLangs().toString(), renderer, el);
        return;
      }
      default: {
        if (translate.getLangs().indexOf(command) === -1) {
          this.addDivToInputGroup(unknownCommand, renderer, el);
        } else {
          try {
            translate.setDefaultLang(command);
            this.addDivToInputGroup(languageChanged, renderer, el);
          } catch (e) {
            return;
          }
        }
      }
    }
  }

  addDivToInputGroup(message: string, renderer: Renderer2, el: ElementRef) {
    const divElement = renderer.createElement('div');
    divElement.className = 'language-message';
    divElement.innerHTML = message;

    renderer.appendChild(el.nativeElement.querySelector(this.settings.design.parent), divElement);
  }
}
