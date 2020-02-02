import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public allBlogs;
  public currentBlog;

  constructor(public blogService : BlogService) { 
    console.log('Home componenet constructor is called');
  }

  ngOnInit() {
    console.log('Home component ngOnInit is called');
    this.allBlogs = this.blogService.getAllBlogs().subscribe(
      data=>{
        console.log(data);
        this.allBlogs = data["data"]; 
        console.log(this.allBlogs);
      },
      error=>{
        console.log('Some error occured');
        console.log(error.errorMessage);
        
      }
    )
    console.log('All blogs');
    console.log(this.allBlogs);
}

  ngOnDestroy() {
    console.log('Home component ngoOnDestroy is called');
    
  }

  

}
