import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
//import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  public allBlog;
  public baseUrl='https://blogapp.edwisor.com/api/v1';
  public authToken='MTljZDI5YjZkOGFhYjgwMWNhYTJkZTYzMmMyNmY2Mzc1YTM3ZjM1Y2JjZWY3YmYyYzllYjdmMjg4OWM2MjM3ZjU0ZmFmMDVhNjZmNTQyZGVhZjI5MzNlMTQxMTM5OWU3NjJjODQyZmY4MGIwOWM3OWRmMGQ2OGI0NjI3YTUxNDc0NjBk';

  constructor(private _http:HttpClient) {
    console.log('Blog service contructor is called');
    
   }

   public getAllBlogs(): any{
      let myResponse = this._http.get(this.baseUrl+'/blogs/all?authToken='+ this.authToken);
      console.log(myResponse);
      return myResponse;
   }

   public getSingleBlog(blogId): any{
      let myResponses = this._http.get(this.baseUrl + '/blogs/view/' + blogId + '?authToken=' + this.authToken);
      console.log(myResponses);
      return myResponses; 
   }

   public createBlog(blogData) : any{
     let myResponses = this._http.post(this.baseUrl + '/blogs/create?authToken=' + this.authToken , blogData);
     console.log(myResponses);
     return myResponses;
   }

   public editBlog(blogId,blogData) : any{
    let myResponses = this._http.put(this.baseUrl + '/blogs/' +blogId+ '/edit?authToken=' + this.authToken , blogData);
    console.log('req received');
    
    console.log(myResponses);
    return myResponses;
  }
}
