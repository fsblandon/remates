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

    this.auctionService.getAuctions(token).subscribe(
      (data: any) => {
        this.auctions = data.results;
        this.auctions.map(d => {
          this.auctionService.getOperation(token, d.operation).subscribe(
            (op: Operation) => {
              if (d.operation === op.id) {
                d.amount = op.amount;
                d.cost_time_priority = op.cost_time_priority
                d.debtor_entity_name = op.debtor_entity_name;
                d.payment_date = op.payment_date;
              }
              this.operations.push(op);
            },
            (error) => {
              console.log(error);
            }
          );
          return d;
        });
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
