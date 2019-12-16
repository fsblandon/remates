import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = 'https://fact2-dev.herokuapp.com/v1';

  constructor(
    private httpClient: HttpClient
  ) { }

  getAuth(
    email: string,
    pass: string
  ): Observable<Auth> {
    return this.httpClient.post<Auth>(
      this.API_URL + '/auth',
      {
        email: email,
        password: pass
      }
    );
  }
}
