import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private _message: string = '';

  constructor() { }


  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }
}
