import {Component, ElementRef, Renderer2} from '@angular/core';
import * as jsonData from "../../config/settings.json";

@Component({
  selector: 'app-helpc',
  standalone: true,
  imports: [],
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss'
})
export class HelpComponent {
  settings: any = (jsonData as any).default;

  addDivToInputGroup(renderer: Renderer2, el: ElementRef): void {
    const text = 'Вы кто такие, Я вас не звал, Идите нахуй!';
    //TODO add help

    const divElement = renderer.createElement('div');
    divElement.className = 'help';
    const textNode = renderer.createText(text);


    renderer.appendChild(divElement, textNode);
    renderer.appendChild(el.nativeElement.querySelector(this.settings.design.parent), divElement);
    // renderer.appendChild(el.nativeElement.getElementById(this.settings.design.parent), divElement);
  }

}
