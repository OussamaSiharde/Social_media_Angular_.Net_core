import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthService} from "../_services/auth.service";
import {AlertifyService} from "../_services/alertify.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import validate = WebAssembly.validate;
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {User} from "../_models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  @Output() cancelRegiter = new EventEmitter();
  registerForm : FormGroup;
  bsConfig : Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService,
              private alertify: AlertifyService,
              private formBuilder: FormBuilder, private router : Router) { }

  ngOnInit(): void {
    this.bsConfig = {
      containerClass: 'theme-red'
    }
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.formBuilder.group({
        gender : ['male'],
        username : ['', Validators.required ],
        knownAs : ['', Validators.required ],
        dateOfBirth: [null, Validators.required],
        city : ['', Validators.required ],
        country : ['', Validators.required ],
        password : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(16)]],
        confirmPassword: ['', Validators.required]
      }, {validators: this.passwordMatchValidator}
    );
  }


  register(){
    if(this.registerForm.valid){
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(()=>{
        this.alertify.success("Registration successful");
      }, error =>{
        this.alertify.error(error);
      }, ()=>{
        this.authService.login(this.user).subscribe(()=>{
          this.router.navigate(['/members']);
        })
      })
    }
  }

  cancel(){
    this.cancelRegiter.emit(false);
    this.alertify.message('cancelled');
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null:
      {'mismatch': true}
  }
}
