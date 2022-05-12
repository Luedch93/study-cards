import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegexService {

  constructor() { }

  isOnlyDeckURL(url: string): boolean {
    let cardRegex = /^\/deck\/(\d*)$/
    return cardRegex.test(url);
  }
}
