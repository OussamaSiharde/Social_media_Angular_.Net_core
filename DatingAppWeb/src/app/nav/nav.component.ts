import { Component, OnInit } from '@angular/core';
import {AuthService} from "../_services/auth.service";
import {AlertifyService} from "../_services/alertify.service";
import {BsDropdownConfig} from "ngx-bootstrap/dropdown";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl : string;

  constructor(private authService: AuthService,
              private alertify: AlertifyService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login(){
    this.authService.login(this.model).subscribe(
      next=>{
        this.alertify.success("logged in successfully");
      },error => {
        this.alertify.error(error);
      }, () => {
        this.router.navigate(['members'])
      }
    );
  }

  loggedIn(){
    return this.authService.loggedIn();
  }

  logout(){
    this.alertify.message('Logged Out');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.router.navigate(['/home']);
  }

}
