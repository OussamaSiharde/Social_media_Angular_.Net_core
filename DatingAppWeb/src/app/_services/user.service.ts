import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHandler, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../_models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl+'users');
  }

  getUser(id):Observable<User>{
    return this.http.get<User>(this.baseUrl+ 'users/' + id);
  }

  updateUser(id: Number, user: User){
    return this.http.put(this.baseUrl + 'users/'+ id, user);
  }

  setMainPhoto(userId: Number, id: Number){
    return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {})
  }

  deletePhoto(userId: Number, id: Number){
    return this.http.delete(this.baseUrl + "users/" + userId + '/photos/' + id);
  }

}
