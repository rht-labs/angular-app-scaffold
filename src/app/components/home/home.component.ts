import { Component, OnInit } from '@angular/core';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Angular 7';

  constructor(public utils: Utils) {}

  ngOnInit() {}
}
