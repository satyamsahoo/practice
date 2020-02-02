import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css']
})
export class BlogViewComponent implements OnInit {

  public currentBlog;

  constructor(private _route: ActivatedRoute, private router: Router,public blogService:BlogService) {
    console.log("View constructor is called");
    
  } 

  ngOnInit() {

    console.log("View Component ngOnInit is called");

    let myBlogId = this._route.snapshot.paramMap.get('blogId');
    console.log(myBlogId);

    this.currentBlog = this.blogService.getSingleBlogInformation(myBlogId);

    console.log(this.currentBlog);
  }

}
