import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {User} from "../../_models/user";
import {UserService} from "../../_services/user.service";
import {ActivatedRoute, CanActivate, Router} from "@angular/router";
import {AlertifyService} from "../../_services/alertify.service";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../_services/auth.service";

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any){
    if(this.editForm.dirty){
      $event.returnValue = true;
    }
  }
  user: User;
  photoUrl: string;

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
    private userService: UserService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    this.authService.currentPhotoUrl.subscribe(photoUrl =>{
      this.photoUrl = photoUrl;
    })
  }

  updateUser() {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(
      next => {
        this.alertify.success("Profile Updated Successfully");
        this.editForm.reset(this.user);
      }, error => {
        this.alertify.error(error);
      }
    );
  }

  updateMainPhoto(photoUrl){
    this.user.photoUrl = photoUrl;
  }
}
