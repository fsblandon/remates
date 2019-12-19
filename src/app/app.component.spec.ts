import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Router, RouteReuseStrategy } from '@angular/router';

import { RouterTestingModule } from "@angular/router/testing";

import { routes, AppRoutingModule } from "./app-routing.module";
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { Location } from "@angular/common";
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

describe('Router outlet', () => {

  let location: Location;
  let router: Router;
  let fixture: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes), 
        AppRoutingModule, 
        IonicModule.forRoot(),
        HttpClientModule
      ],
      declarations: [AppComponent],
      providers: [
        StatusBar,
        SplashScreen,
        { 
          provide: RouteReuseStrategy, 
          useClass: IonicRouteStrategy 
        }
      ],
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  });

  it("fakeAsync works", fakeAsync(() => {
    let promise = new Promise(resolve => {
      setTimeout(resolve, 10);
    });
    let done = false;
    promise.then(() => (done = true));
    tick(50);
    expect(done).toBeTruthy();
  }));

  it('navigate to "" redirects you to /login', fakeAsync(() => {
    router.navigate([""]).then(() => {
      expect(location.path()).toBe("/login");
    });
  }));

  it('navigate to "home" takes you to /home', fakeAsync(() => {
    router.navigate(["/home"]).then(() => {
      expect(location.path()).toBe("/home");
    });
  }));

});
