import { Component, OnInit } from '@angular/core';
import { AuctionsService } from 'src/app/services/auctions.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [AuctionsService]
})
export class HomePage implements OnInit {

  constructor(
    private auctionService: AuctionsService
  ) {}

  ngOnInit() {
    let token: string;
    const data = JSON.parse(sessionStorage.getItem('userAuth'));
    token = data.token;
    console.log(token);

    this.auctionService.getAuctions(token).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
