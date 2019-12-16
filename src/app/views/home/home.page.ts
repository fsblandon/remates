import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
  ) {}

  ngOnInit() {
    let token: string;
    const data = JSON.parse(sessionStorage.getItem('userAuth'));
    token = data.token;
    console.log(token);
  }

}
