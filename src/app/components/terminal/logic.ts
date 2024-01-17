import {ElementRef, Renderer2} from "@angular/core";
import {Help} from "./commands/help";
import {Error} from "./commands/error";
import {Clear} from "./commands/clear";
import {ChangeTheme} from "./commands/change-theme";



export class Logic {

  help: Help = new Help();
  error: Error = new Error();
  clear: Clear = new Clear();
  changeTheme: ChangeTheme = new ChangeTheme();

  onEnterKey(message: string, renderer: Renderer2, el: ElementRef){
    switch (message) {
      case 'help': {
        this.help.addDivToInputGroup(renderer, el);
        break;
      }
      case 'clear': {
        this.clear.clear(renderer, el);
        break;
      }
      case 'change-theme': {
        this.changeTheme.addDivToInputGroup(message, renderer, el);
        break;
      }
      default: {
        this.error.addDivToInputGroup(message, renderer, el);
        break;
      }
    }
  }
}
