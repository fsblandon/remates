import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    public router: Router
  ) { }

  canActivate() {
    const data = JSON.parse(sessionStorage.getItem('userAuth'));
    if (data.token === '') {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
