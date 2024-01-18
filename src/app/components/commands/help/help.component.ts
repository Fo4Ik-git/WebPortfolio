import {Component, ElementRef, Renderer2, ViewContainerRef} from '@angular/core';
import * as jsonData from "../../../config/settings.json";

@Component({
  selector: 'app-helpc',
  standalone: true,
  imports: [],
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss'
})
export class HelpComponent {
  settings: any = (jsonData as any).default;

  addDivToInputGroup(viewRef: ViewContainerRef, renderer: Renderer2, el: ElementRef): void {
    const compRef = viewRef.createComponent(HelpComponent)
    renderer.appendChild(el.nativeElement.querySelector(this.settings.design.parent), compRef.location.nativeElement);

  }

}
