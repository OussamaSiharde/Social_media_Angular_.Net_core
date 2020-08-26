import { Component, OnInit } from '@angular/core';
import {AuthService} from "../_services/auth.service";
import {AlertifyService} from "../_services/alertify.service";
import {BsDropdownConfig} from "ngx-bootstrap/dropdown";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService,
              private alertify: AlertifyService) { }

  ngOnInit(): void {
  }

  login(){
    this.authService.login(this.model).subscribe(
      next=>{
        this.alertify.success("logged in successfully");
      },error => {
        this.alertify.error(error);
      }
    );
  }

  loggedIn(){
    return this.authService.loggedIn();
  }

  logout(){
    this.alertify.message('Logged Out');
    localStorage.removeItem('token');
  }


}
