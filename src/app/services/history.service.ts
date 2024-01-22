import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private history: string[] = [];
  private currentIndex: number = 1;
  constructor() { }

  push(command: string) {
    this.history.pop();
    this.history.push(command);
    this.currentIndex = 1;

  }

  enter(message: string) {
    if (this.currentIndex != 1) {
      this.push(message);
    }
    this.history.push('');
  }

  arrowUp(): string {
    if (this.currentIndex < this.history.length) {
      this.currentIndex++;
    }
    let nextCommand = this.history[this.history.length - this.currentIndex];
    if(nextCommand === undefined) {
      return ''
    }
    return nextCommand
  }

  arrowDown(): string {
    if (this.currentIndex > 1) {
      this.currentIndex--;
    }
    let nextCommand = this.history[this.history.length - this.currentIndex];
    if(nextCommand === undefined) {
      return ''
    }
    return nextCommand;

  }
}
