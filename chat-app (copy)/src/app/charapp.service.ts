import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpParams, HttpClient, HttpErrorResponse} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CharappService {

  constructor(private _http: HttpClient,
              private cookie:CookieService) { }

  private baseUrl = 'https://chatapi.edwisor.com/api/v1/';
  authToken = 'MTljZDI5YjZkOGFhYjgwMWNhYTJkZTYzMmMyNmY2Mzc1YTM3ZjM1Y2JjZWY3YmYyYzllYjdmMjg4OWM2MjM3ZjU0ZmFmMDVhNjZmNTQyZGVhZjI5MzNlMTQxMTM5OWU3NjJjODQyZmY4MGIwOWM3OWRmMGQ2OGI0NjI3YTUxNDc0NjBk';
  
  public signUpFunction(data) : Observable<any>{

    console.log('SignUpfunction of Service called')

    const params = new HttpParams()
    .set('firstName',data.firstName)
    .set('lastName',data.lastName)
    .set('email',data.email)
    .set('mobileNumber',data.mobile)
    .set('password',data.password)
    .set('apiKey',this.authToken)
    console.log('sending params of signup data in Service called')

    return this._http.post(`${this.baseUrl}users/signup`, params);
  }

  public loginFunction(data) : Observable<any>{

    const params = new HttpParams()
    .set('email',data.email)
    .set('password',data.password)

    return this._http.post(`${this.baseUrl}users/login`,params);
  }

  public getUserInformationFromLocalStorage = () =>{
    return JSON.parse(localStorage.getItem('userInfo'));
  }

  public setUserInformationInLocalStorage = (data) =>{
    localStorage.setItem('userInfo',JSON.stringify(data))
  }

  public logout(): Observable<any> {

    const params = new HttpParams()
      .set('authToken', this.cookie.get('authtoken'))

    return this._http.post(`${this.baseUrl}users/logout`, params);

  }

}
