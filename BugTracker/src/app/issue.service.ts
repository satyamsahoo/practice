import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams, HttpClient} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  constructor(private _http:HttpClient,
    private cookieService:CookieService) { }

    private baseUrl = 'api/v1';

    public setUserInformationLocalStorage=(data)=>{
      localStorage.setItem('userInfo',JSON.stringify(data))
    }
  
    public getUserInformationLocalStorage=()=>{
      return JSON.parse(localStorage.getItem('userInfo'));
    }
  
    public loginFunction(data):Observable<any> {
      const httpParams = new HttpParams()
      .set('email',data.email)
      .set('password',data.password)
  
      return this._http.post(`${this.baseUrl}/users/login`,httpParams);
    }
  
    public signUpFunction(data):Observable<any>{
      const httpParaams = new HttpParams()
      .set('firstName',data.firstName)
      .set('lastName',data.lastName)
      .set('email',data.email)
      .set('password',data.password)
  
      return this._http.post(`${this.baseUrl}/users/signup`,httpParaams);
    }

    public logout(userId):Observable<any>{
      return this._http.get(`${this.baseUrl}/users/${userId}/logout`);
    }
}
