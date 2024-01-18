import {
    Component,
    ElementRef,
    Renderer2,
    ViewContainerRef
} from '@angular/core';
import * as jsonData from "../../../config/settings.json";

@Component({
    selector: 'app-about-me',
    standalone: true,
    imports: [],
    templateUrl: './about-me.component.html',
    styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {
    constructor() {
    }

    settings: any = (jsonData as any).default;

    addDivToInputGroup(viewRef: ViewContainerRef, renderer: Renderer2, el: ElementRef): void {
        const compRef = viewRef.createComponent(AboutMeComponent)
        renderer.appendChild(el.nativeElement.querySelector(this.settings.design.parent), compRef.location.nativeElement);

    }
}
