import {ElementRef, Inject, Renderer2} from "@angular/core";
import * as jsonData from "../../config/settings.json";
import {TerminalComponent} from "../terminal/terminal.component";
import {SharedDataService} from "../../services/shared-data.service";

export class ChangeTheme {
  constructor(private sharedData: SharedDataService) {
  }

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
    this.sharedData.cvPath=TerminalComponent.isLightTheme ? this.settings.user.cvLightPath : this.settings.user.cvDarkPath
    document.body.setAttribute(
      'data-theme',
      TerminalComponent.isLightTheme ? 'light' : 'dark'
    );
  }
}
