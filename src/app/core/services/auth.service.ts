import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/AuthModels';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey: string = 'jwt_token';
  url :string = "";

  constructor(private http: HttpClient, private router: Router, private msg:ToastrService, base:BaseApiService) { 
    this.url = base.apiUrl+'/auth';
  }

  register(user: User){
    this.http.post<User>(`${this.url}/register`, user).pipe(
      catchError((err) =>{
        this.msg.error(err.error.message,"Operation failed");
        throw err;
      })
    ).subscribe(
      (value)=>{
        if(value.id !== 0){
          // redirect to login page so the new user can start
          this.msg.success("Registration complete");
          this.router.navigate(['/auth/login']);
        }else{
          this.msg.error("The system had an unexpected error","Operation failed");
        }
      }
    );
  }

  login(user: User){
    this.http.post<any>(`${this.url}/login`, user).pipe(
      catchError((err) =>{
        this.msg.error(err.error.message,"Login failed");
        throw err;
      })
    ).subscribe(
      (value)=>{
        if(value.success){
          // save the token into session so that the guards know hot to get the token
          sessionStorage.setItem(this.tokenKey, value.token);
          sessionStorage.setItem("username", user.username);
          // go back to home page
          this.router.navigate(['/'])
        }else{
          this.msg.warning("Incorrect credentials");
        }
      }
    );
  }

  getToken(){
    return sessionStorage.getItem(this.tokenKey);
  }
  
  logout(){
    sessionStorage.removeItem(this.tokenKey);
    this.router.navigate(['/'])
  }

  isUserActive():boolean{
    let token = sessionStorage.getItem(this.tokenKey);
    return token !== null;
  }

  isUserAdmin():Promise<boolean>{
    const token = sessionStorage.getItem(this.tokenKey);

    if(token === null) 
      return new Promise((resolve)=>resolve(false));

    //Define the headers to send the token to the api
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    });
    return new Promise<boolean>((resolve, reject) =>{
      
      this.http.get<boolean>(`${this.url}/isAdmin`, { headers }).pipe(
        catchError((err) =>{
          resolve(false);
          throw err;
        })
      ).subscribe(
        (value)=>{
          resolve(value);
        }
      );
    });
  }
}
