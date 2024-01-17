import {ElementRef, Renderer2} from "@angular/core";
import * as jsonData from "../../../../assets/settings.json";
import {TerminalComponent} from "../terminal.component";

export class ChangeTheme {

  settings: any = (jsonData as any).default;

  addDivToInputGroup(message: string, renderer: Renderer2, el: ElementRef): void {
    let text = `Theme changed!`;
    this.onThemeSwitchChange();
    const divElement = renderer.createElement('div');
    divElement.className = 'theme-changed';
    divElement.innerHTML = text;

    renderer.appendChild(el.nativeElement.querySelector(this.settings.design.parent), divElement);
    // renderer.appendChild(el.nativeElement.getElementById(this.settings.design.parent), divElement);

  }

  onThemeSwitchChange() {
    TerminalComponent.isLightTheme = !TerminalComponent.isLightTheme;

    document.body.setAttribute(
      'data-theme',
      TerminalComponent.isLightTheme ? 'light' : 'dark'
    );
  }
}
