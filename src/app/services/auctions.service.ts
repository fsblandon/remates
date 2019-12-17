import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auction } from '../models/auction';

@Injectable({
  providedIn: 'root'
})
export class AuctionsService {

  API_URL = 'https://fact2-dev.herokuapp.com';

  constructor(
    private httpClient: HttpClient
  ) { }

  getAuctions(
    token: string
  ): Observable<Auction[]> {
    
    const options = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`
    });
    return this.httpClient.get<Auction[]>(
      this.API_URL + '/v1/factoring/auctions',
      {
        headers : options
      }
    );
  }

  getOperation(
    token: string,
    id: string
  ): Observable<any> {
    const options = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`
    });
    return this.httpClient.get(
      this.API_URL + '/v1/factoring/operations/' + id,
      {
        headers: options
      }
    );
  }


}
