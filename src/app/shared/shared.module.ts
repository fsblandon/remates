import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from '../views/home/home.page';
import { LoginPage } from '../views/login/login.page';


@NgModule({
  declarations: [
    HomePage,
    LoginPage
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomePage,
    LoginPage
  ]
})
export class SharedModule { }
