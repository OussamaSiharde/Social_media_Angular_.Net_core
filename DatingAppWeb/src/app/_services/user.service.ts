import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHandler, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../_models/user";
import {PaginationResult} from "../_models/Pagination";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers(page?, itemsPerPage?):Observable<PaginationResult<User[]>>{

    const paginationResults: PaginationResult<User[]> = new PaginationResult<User[]>();

    let params = new HttpParams();

    if(page != null && itemsPerPage != null){
      params = params.append("pageNumber", page);
      params = params.append("pageSize", itemsPerPage)
    }

    return this.http.get<User[]>(this.baseUrl+'users', {observe: 'response', params})
      .pipe(
        map(res => {
          paginationResults.result = res.body;
          if(res.headers.get('Pagination') != null){
            paginationResults.pagination = JSON.parse(res.headers.get('Pagination'));
          }
          return paginationResults;
        })
      );
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
