import {ElementRef, Renderer2, ViewContainerRef} from "@angular/core";
import {Error} from "../commands/error";
import {Clear} from "../commands/clear";
import {ChangeTheme} from "../commands/change-theme";
import {HelpComponent} from "../commands/help/help.component";
import {AboutMeComponent} from "../commands/about-me/about-me.component";
import {TranslateService} from "@ngx-translate/core";


export class Logic {

  help: HelpComponent = new HelpComponent(this.translate);
  error: Error = new Error();
  clear: Clear = new Clear();
  changeTheme: ChangeTheme = new ChangeTheme();
  aboutMe: AboutMeComponent = new AboutMeComponent();

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  onEnterKey(message: string, renderer: Renderer2, el: ElementRef, viewRef: ViewContainerRef) {
    switch (message) {
      case 'help': {
        this.help.addDivToInputGroup(viewRef, renderer, el);
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
