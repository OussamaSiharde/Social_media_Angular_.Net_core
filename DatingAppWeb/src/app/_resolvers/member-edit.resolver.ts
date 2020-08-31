import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {User} from "../_models/user";
import {Observable, of} from "rxjs";
import {UserService} from "../_services/user.service";
import {AlertifyService} from "../_services/alertify.service";
import {catchError} from "rxjs/operators";
import {AuthService} from "../_services/auth.service";

@Injectable()
export class MemberEditResolver implements Resolve<User>{
  constructor(private userServices:UserService,
              private router:Router, private alertify:AlertifyService,
              private auth: AuthService) {
  }
  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userServices.getUser(this.auth.decodedToken.nameid).pipe(
      catchError(err => {
        this.alertify.error(err.message);
        this.router.navigate(['/members']);
        return of(null);
      })
    )
  }s
}
