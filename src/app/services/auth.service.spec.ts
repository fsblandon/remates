import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('AuthService', () => {
  const mockResponse = {
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiODJiZTgwODAtY2ExYy00ODdjLTg5ZDEtMTg4ZDkxYTlhZmExIiwidXNlcm5hbWUiOiJhbmRyZXMyMjMiLCJleHAiOjE1NzczMjg2ODMsImVtYWlsIjoidGVzdGluZ2J1eWVyLjExNEBnbWFpbC5jb20ifQ.97fKFdvuVWoDcB1Tc-vQVEhucKD_FuuuUaebgCo3CxA",
    "id": "82be8080-ca1c-487c-89d1-188d91a9afa1",
    "admin": false,
    "role": "buyers",
    "user_type": 1
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
  });

  describe('get data', () =>{
    it('should get results',
    inject([HttpTestingController, AuthService], (httpMock: HttpTestingController, myServiceTested: AuthService) => {
      const swapiUrl = 'https://fact2-dev.herokuapp.com/v1/auth';
      myServiceTested.getAuth('testingbuyer.114@gmail.com', 'Andres20')
      .subscribe(
        (res: any) => {
          expect(res).toEqual(mockResponse);
        }
      );
      const req = httpMock.expectOne(swapiUrl);
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    }));
  });
});
