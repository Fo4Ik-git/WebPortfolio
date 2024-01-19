import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import * as jsonData from "./config/settings.json";
import {Title} from "@angular/platform-browser";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  settings: any = (jsonData as any).default;

  constructor(private titleService: Title, private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.get(this.settings.user.name).subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  }
}
