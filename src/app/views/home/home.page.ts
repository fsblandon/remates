import { Component, OnInit } from '@angular/core';
import { AuctionsService } from 'src/app/services/auctions.service';
import { Auction } from 'src/app/models/auction';
import { Operation } from 'src/app/models/operation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [AuctionsService]
})
export class HomePage implements OnInit {

  auctions: Auction[] = [];

  operations: Operation[] = [];

  constructor(
    private auctionService: AuctionsService
  ) {}

  ngOnInit() {
    let token: string;
    const data = JSON.parse(sessionStorage.getItem('userAuth'));
    token = data.token;
    console.log(token);

    this.auctionService.getAuctions(token).subscribe(
      (data: any) => {
        console.log(data);
        data.results.filter(d => {
          this.auctions.push(d);
          this.auctionService.getOperation(token, d.operation).subscribe(
            (op) => {
              this.operations.push(op);
            },
            (error) => {
              console.log(error);
            }
          );
        });
        console.log(this.auctions);
        console.log(this.operations);
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
