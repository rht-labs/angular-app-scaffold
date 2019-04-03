import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Utils {
  constructor(private router: Router) {}

  //  common routing functions
  public navigateTo(path: string, query?: object) {
    this.router.navigate([path], { queryParams: query });
  }

  public getCurrentRoute(): string {
    return this.router.url;
  }
}
