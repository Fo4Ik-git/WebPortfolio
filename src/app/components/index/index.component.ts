import {Component} from '@angular/core';
import {TerminalComponent} from "../terminal/terminal.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-index',
  standalone: true,
    imports: [
        TerminalComponent,
        TranslateModule,
        HeaderComponent
    ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {
  isLightTheme = true;

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }

  onThemeSwitchChange() {
    this.isLightTheme = !this.isLightTheme;

    document.body.setAttribute(
      'data-theme',
      this.isLightTheme ? 'light' : 'dark'
    );
  }
}
