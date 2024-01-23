import {ElementRef, Renderer2, ViewContainerRef} from "@angular/core";
import {Error} from "../commands/error";
import {Clear} from "../commands/clear";
import {ChangeTheme} from "../commands/change-theme";
import {HelpComponent} from "../commands/help/help.component";
import {AboutMeComponent} from "../commands/about-me/about-me.component";
import {TranslateService} from "@ngx-translate/core";
import {SharedDataService} from "../../services/shared-data.service";
import {CvComponent} from "../commands/cv/cv.component";
import {GhProjectsComponent} from "../commands/gh-projects/gh-projects.component";
import {ChangeLanguageComponent} from "../commands/change-language/change-language.component";
import {HttpClient} from "@angular/common/http";

export class Logic {

  help: HelpComponent = new HelpComponent(this.translate, this.sharedData);
  error: Error = new Error();
  clear: Clear = new Clear();
  changeTheme: ChangeTheme = new ChangeTheme(this.sharedData);
  aboutMe: AboutMeComponent = new AboutMeComponent(this.translate);
  ghProjects: GhProjectsComponent = new GhProjectsComponent();
  changeLanguage: ChangeLanguageComponent = new ChangeLanguageComponent(this.http);

  constructor(private translate: TranslateService, private sharedData: SharedDataService, private http: HttpClient) {
    translate.setDefaultLang('en');
  }

  onEnterKey(message: string, renderer: Renderer2, el: ElementRef, viewRef: ViewContainerRef) {

    let input = message.split(' ');
    let command = input[0].toLowerCase();

    switch (command) {
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
      case 'projects': {
        this.ghProjects.addDivToInputGroup(viewRef, renderer, el)
        break
      }
      case 'change-language': {
        this.changeLanguage.hub(input, this.translate, renderer, el);
        break;
      }
      default: {
        this.error.addDivToInputGroup(message, renderer, el);
        break;
      }
    }
  }
}
