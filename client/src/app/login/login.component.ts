import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';
import {NgxSmartModalService} from 'ngx-smart-modal';


@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    public ngxSmartModalService: NgxSmartModalService,
    private alertService: AlertService) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    console.log('data1');
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          // this.router.navigate([this.returnUrl]);
          this.router.navigate(['test']);
          this.ngxSmartModalService.getModal('login').close()
          console.log('data');
        });
  }

}
