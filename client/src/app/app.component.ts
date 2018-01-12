import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {AlertService} from './_services/alert.service';
import {AuthenticationService} from './_services/authentication.service';
import {UserService} from './_services/user.service';
import {LoginComponent} from './login/index';
import {RegisterComponent} from './register/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  title = 'app';
  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private userService: UserService,
    public loginComponent: LoginComponent,
    public registerComponent: RegisterComponent
  ) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }


  login() {
    this.loading = true;
    console.log('nassim1');
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
