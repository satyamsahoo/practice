import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  public currentBlog;
  constructor(public router: ActivatedRoute,public blogService : BlogService) { 
    console.log('View component constructor called');
  }

  ngOnInit() {

    console.log('View component ngOnInit called');
    

    let currentBlogId = this.router.snapshot.paramMap.get('blogId');
    console.log(currentBlogId);
    

    this.currentBlog = this.blogService.getSingleBlog(currentBlogId).subscribe(
      data=>{
        console.log(this.currentBlog);
        this.currentBlog = data["data"];
        console.log(this.currentBlog);
        
      },
      error=>{
        console.log('some error occured');
        console.log(error.errorMessage);
        
      }
      
    )
    console.log(this.currentBlog);
    
  }

}
