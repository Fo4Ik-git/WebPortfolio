import {ElementRef, Renderer2, ViewContainerRef, ViewRef} from "@angular/core";
import {Help} from "./commands/help";
import {Error} from "./commands/error";
import {Clear} from "./commands/clear";
import {ChangeTheme} from "./commands/change-theme";
import {AboutMeComponent} from "./commands/about-me/about-me.component";



export class Logic {

  help: Help = new Help();
  error: Error = new Error();
  clear: Clear = new Clear();
  changeTheme: ChangeTheme = new ChangeTheme();
  aboutMe: AboutMeComponent = new AboutMeComponent();

  onEnterKey(message: string, renderer: Renderer2, el: ElementRef, viewRef: ViewContainerRef){
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
      case 'about-me': {
        this.aboutMe.addDivToInputGroup(viewRef, renderer, el)
        break
      }
      default: {
        this.error.addDivToInputGroup(message, renderer, el);
        break;
      }
    }
  }
}
