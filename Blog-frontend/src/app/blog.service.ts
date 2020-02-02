import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  public allBlogs = [

    {
      "blogId" :"1",
      "lastModified" :"2017-10-2",
      "created" :"2017-10-2",
      "tags":[],
      "author" : "admin",
      "category" :"comedy",
      "bodyHtml" : "this is bodytag",
      "description" : "this is blog-1 description",
      "title" : "this is blog 1"
    },
    {
      "blogId" :"2",
      "lastModified" :"2017-10-2",
      "created" :"2017-10-2",
      "tags":[],
      "author" : "admin",
      "category" :"comedy",
      "bodyHtml" : "this is bodytag",
      "description" : "this is blog-2 description",
      "title" : "this is blog 2"
    },
    {
      "blogId" :"3",
      "lastModified" :"2017-10-2",
      "created" :"2017-10-2",
      "tags":[],
      "author" : "admin",
      "category" :"comedy",
      "bodyHtml" : "this is bodytag",
      "description" : "this is blog-3 description",
      "title" : "this is blog 3"
    }


  ]

  public currentBlog;

  public getAllBlogs():any{
    return this.allBlogs;
  }

  public getSingleBlogInformation(currentBlogId):any {

    for(let blog of this.allBlogs){
      if(blog.blogId == currentBlogId)
        this.currentBlog = blog;
    }

    console.log("Serviceee"  + this.currentBlog);

    return this.currentBlog;
  }
  

  constructor() { 
    console.log("Blog Service constructor is called.");
  }
}
