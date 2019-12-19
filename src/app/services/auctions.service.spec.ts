import { TestBed, inject } from '@angular/core/testing';

import { AuctionsService } from './auctions.service';

import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('AuctionsService', () => {
  const mockResponse = {
    "id": 1,
            "operation": "1ee93f2e-a455-4297-95ff-019b21d2b981",
            "start_date": "2018-02-15T21:00:00Z",
            "end_date": "2018-02-16T22:00:00Z",
            "renew_times": 0,
            "max_monthly_discount_rate": "1.80000",
            "min_advance_rate": 0.85,
            "tir": 20.24464094547025,
            "max_close_monthly_discount_rate": null,
            "min_close_advance_rate": "0.85000",
            "is_funded": false,
            "status": 3,
            "discount_rates": [
                1.53818,
                1.8
            ],
            "advance_amount": 8303.633,
            "paid": true,
            "advance_transferred": true,
            "gross_advance_amount": 8470,
            "remainder_transferred": false,
            "advance_transfer_date": "2018-02-16T05:00:00Z",
            "seller_remaining_amount": 904.75,
            "percentage_completed": 0.9930920897284534
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuctionsService]
    });
  });

  describe('get data', () =>{
    it('should get results',
    inject([HttpTestingController, AuctionsService], (httpMock: HttpTestingController, myServiceTested: AuctionsService) => {
      const swapiUrl = 'https://fact2-dev.herokuapp.com/v1/factoring/auctions';
      myServiceTested.getAuctions('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiODJiZTgwODAtY2ExYy00ODdjLTg5ZDEtMTg4ZDkxYTlhZmExIiwidXNlcm5hbWUiOiJhbmRyZXMyMjMiLCJleHAiOjE1NzcwODE5NDIsImVtYWlsIjoidGVzdGluZ2J1eWVyLjExNEBnbWFpbC5jb20ifQ.GN8un2CAS9hFkPpSj8RQBijQh6CpmnLdp44ChL0A8lA')
      .subscribe(
        (res: any) => {
          expect(res.result[0]).toEqual(mockResponse);
        }
      );
      const req = httpMock.expectOne(swapiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    }));
  });
});
