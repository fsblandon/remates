import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [AuthService]
})
export class LoginPage implements OnInit {

  subscription: any;

  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    public loadingController: LoadingController,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    /* this.email = 'testingbuyer.114@gmail.com';
    this.pass = 'Andres20'; */

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', Validators.required]
    });

    sessionStorage.clear();
  }

  login() {
    const email = this.loginForm.controls['email'].value;
    const pass = this.loginForm.controls['pass'].value;
    this.getUserAuth(email, pass);
  }

  async getUserAuth(email: string, pass: string) {
    const loading = await this.loadingController.create({
      message: 'Verificando',
      duration: 4000
    });

    this.subscription = this.authService.getAuth(email, pass).subscribe(
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
