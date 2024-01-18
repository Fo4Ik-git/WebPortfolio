import {Component, ElementRef, Renderer2, ViewContainerRef} from '@angular/core';
import * as settings from "../../../config/settings.json";
import {NgClass, NgForOf, NgTemplateOutlet} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [
    NgForOf,
    NgTemplateOutlet,
    TranslateModule,
    NgClass
  ],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {
  constructor(private translate: TranslateService) {
  }

  settings: any = (settings as any).default;
  avatarTemplate: any = "avatarTemplate";

  addDivToInputGroup(viewRef: ViewContainerRef, renderer: Renderer2, el: ElementRef): void {
    const compRef = viewRef.createComponent(AboutMeComponent)
    renderer.appendChild(el.nativeElement.querySelector(this.settings.design.parent), compRef.location.nativeElement);

  }
}
