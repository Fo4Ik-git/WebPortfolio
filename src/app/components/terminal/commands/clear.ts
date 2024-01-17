import {ElementRef, Renderer2} from "@angular/core";
import * as jsonData from "../../../../assets/settings.json";
export class Clear {

  settings: any = (jsonData as any).default;
  clear(renderer: Renderer2, el: ElementRef) {
    const divElement = el.nativeElement.querySelector(this.settings.design.parent);
    // const divElement = el.nativeElement.getElementById(this.settings.design.parent);
    divElement.innerHTML = '';
  }

}
