import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [AuthService]
})
export class LoginPage implements OnInit {

  subscription: any;

  email: string;

  pass: string

  constructor(
    private authService: AuthService,
    private router: Router,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.email = 'testingbuyer.114@gmail.com';
    this.pass = 'Andres20';

    this.getUserAuth();
    sessionStorage.clear();
  }

  async getUserAuth() {
    const loading = await this.loadingController.create({
      message: 'Verificando',
      duration: 4000
    });

    this.subscription = this.authService.getAuth(this.email, this.pass).subscribe(
      (data) => {
        loading.present();
        if (data.token !== '') {
          sessionStorage.setItem('userAuth', JSON.stringify(data));
          this.router.navigate(['home']);
        }
        loading.dismiss();
      },
      (error) => {
        console.log(error);
        loading.dismiss();
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
