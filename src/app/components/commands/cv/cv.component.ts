import {Component, ElementRef, Renderer2, ViewContainerRef} from '@angular/core';
import * as settings from "../../../config/settings.json";
import {SharedDataService} from "../../../services/shared-data.service";
import {NgClass} from "@angular/common";
import {ImageModule} from "primeng/image";

@Component({
    selector: 'app-cv',
    standalone: true,
    imports: [
        NgClass,
        ImageModule
    ],
    templateUrl: './cv.component.html',
    styleUrl: './cv.component.scss'
})
export class CvComponent {
    constructor(public sharedData: SharedDataService) {
    }

    settings: any = (settings as any).default;

    addDivToInputGroup(viewRef: ViewContainerRef, renderer: Renderer2, el: ElementRef): void {
        const compRef = viewRef.createComponent(CvComponent)
        renderer.appendChild(el.nativeElement.querySelector(this.settings.design.parent), compRef.location.nativeElement);
    }
}
