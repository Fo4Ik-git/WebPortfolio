import {Component, ElementRef, inject, Renderer2, ViewContainerRef} from '@angular/core';
import {Observable} from "rxjs";
import {GithubApiService} from "../../../services/github-api.service";
import * as settings from "../../../config/settings.json";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-gh-projects',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './gh-projects.component.html',
  styleUrl: './gh-projects.component.scss'
})
export class GhProjectsComponent {
  settings: any = (settings as any).default;
  repositoryInfo: any;
  githubService: GithubApiService = inject(GithubApiService)
  data: any = [];
  constructor() {
    let repoData;
    for(repoData of this.settings.user.repositories)
      this.getRepoInfo(repoData).subscribe(
        (data) => {
          this.data.push(data);},
        (error) => {
          console.error('Error fetching repository info:', error);
        }
      );
  }
  getRepoInfo(repoInfo:any): Observable<any> {
    let data = this.githubService.getRepositoryInfo(repoInfo.owner, repoInfo.name);

    return data;
  }

  addDivToInputGroup(viewRef: ViewContainerRef, renderer: Renderer2, el: ElementRef): void {
    const compRef = viewRef.createComponent(GhProjectsComponent)
    renderer.appendChild(el.nativeElement.querySelector(this.settings.design.parent), compRef.location.nativeElement);

  }
}
