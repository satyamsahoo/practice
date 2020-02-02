import { Injectable } from '@angular/core';
import {HttpClient ,  HttpErrorResponse} from '@angular/common/http';

//import Observable related code

import { Observable } from "rxjs/Observable";
import { catchError } from 'rxjs/operators';

//import 'rxjs/add/operator/catchError';
//import 'rxjs/add/operator/do';

@Injectable()
export class BlogHttpService {

  public allBlogs;
  public currentBlog;
  public baseUrl = 'https://blogapp.edwisor.com/api/v1/blogs' ;
  private authToken = 'MTljZDI5YjZkOGFhYjgwMWNhYTJkZTYzMmMyNmY2Mzc1YTM3ZjM1Y2JjZWY3YmYyYzllYjdmMjg4OWM2MjM3ZjU0ZmFmMDVhNjZmNTQyZGVhZjI5MzNlMTQxMTM5OWU3NjJjODQyZmY4MGIwOWM3OWRmMGQ2OGI0NjI3YTUxNDc0NjBk';


  constructor(private _http:HttpClient) {
    console.log("Blog-http service constructor is called");
    
   }

  private  handleError(err : HttpErrorResponse){
    console.log("Handle error http call");
    console.log(err.message);
    return Observable.throw(err.message)
    
  } 

   public getAllBlogs():any{
    let myResponse = this._http.get(this.baseUrl+ "/all" + "?authToken=" + this.authToken);
    console.log(myResponse);
    return myResponse;
  }

  public getSingleBlogInformation(currentBlogId):any {



  } 

  public createBlog(blogData):any{
    let myResponse = this._http.post(this.baseUrl + "/create" + "?authToken=" + this.authToken, blogData );
    return myResponse;
  }

  public editBlog(blogId, blogData) : any{
    let myResponse= this._http.put(this.baseUrl + '/' + blogId + '/edit' + '?authToken=' + this.authToken, blogData);
    return myResponse;
  }

  public deleteBlog(blogId): any{
    let data = {}
    let myResponse = this._http.post(this.baseUrl + '/' + blogId + '/delete' + '?=authToken=' + this.authToken, data );
    return myResponse;
  }

  
}
