import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class GithubApiService {
  private apiUrl = 'https://api.github.com/repos';

  constructor(private http: HttpClient) {}

  getRepositoryInfo(owner: string, repo: string): Observable<any> {
    const url = `${this.apiUrl}/${owner}/${repo}`;
    return this.http.get(url);
  }

}
