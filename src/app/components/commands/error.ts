import {ElementRef, Renderer2} from "@angular/core";
import * as jsonData from "../../config/settings.json";

export class Error {

  settings: any = (jsonData as any).default;

  addDivToInputGroup(message: string, renderer: Renderer2, el: ElementRef): void {
    let text = `Command '<span style="color: var(--error-color);">${message}</span>' not found`;
    if (message === '') {
      text = 'Please enter a command';
    }

    const divElement = renderer.createElement('div');
    divElement.className = 'error';
    divElement.innerHTML = text;

    renderer.appendChild(el.nativeElement.querySelector(this.settings.design.parent), divElement);
    // renderer.appendChild(el.nativeElement.getElementById(this.settings.design.parent), divElement);

  }
}
