import {Component, ElementRef, Renderer2, ViewContainerRef} from '@angular/core';
import * as jsonData from "../../../config/settings.json";
import * as commands from "../../../config/commands.json";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";


@Component({
  selector: 'app-helpc',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule
  ],
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss'
})
export class HelpComponent {
  settings: any = (jsonData as any).default;
  commands: any = (commands as any).default.sort(((a: { command: number; }, b: {
    command: number;
  }) => (a.command > b.command) ? 1 : -1));

  // commands: any = (commands as any).default


  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }


  addDivToInputGroup(viewRef: ViewContainerRef, renderer: Renderer2, el: ElementRef): void {
    const compRef = viewRef.createComponent(HelpComponent)
    renderer.appendChild(el.nativeElement.querySelector(this.settings.design.parent), compRef.location.nativeElement);

  }

}
