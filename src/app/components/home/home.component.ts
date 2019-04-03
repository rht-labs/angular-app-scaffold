import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public title = 'Angular 7';

  constructor(public utils: Utils) {}

  ngOnInit() {}
}
