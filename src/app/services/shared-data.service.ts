import {Injectable} from '@angular/core';
import value from "*.json";
import * as jsonData from "../config/settings.json";

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  settings: any = (jsonData as any).default;

  private _message: string = '';
  private _cvPath: string = '';

  constructor() {
  this._cvPath=this.settings.user.cvDarkPath;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }


  get cvPath(): string {
    return this._cvPath;
  }

  set cvPath(value: string) {
    this._cvPath = value;
  }
}
