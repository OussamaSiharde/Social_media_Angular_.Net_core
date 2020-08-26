import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthService} from "../_services/auth.service";
import {AlertifyService} from "../_services/alertify.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Output() cancelRegiter = new EventEmitter();

  constructor(private authservice: AuthService,
              private alertify: AlertifyService) { }

  ngOnInit(): void {
  }

  register(){
    this.authservice.register(this.model).subscribe(()=>{
      this.alertify.success('registration success!');
    }, error => {
      this.alertify.error(error);
    })
  }

  cancel(){
    this.cancelRegiter.emit(false);
    this.alertify.message('cancelled');
  }

}
