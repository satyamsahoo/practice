import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogService } from '../blog.service';
import { BlogHttpService } from '../blog-http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public allBlogs;


  ngOnDestroy(): void {
    console.log("Method not implemented.");
  }

  

  constructor(public blogHttpService:BlogHttpService) { 

    console.log("Home component constructor is called");
    
  }

  ngOnInit() {

    console.log("Home component ngOnInint is called");
    

    this.allBlogs = this.blogHttpService.getAllBlogs().subscribe(

      data =>{
        console.log("Logging data");
        console.log(data);
        this.allBlogs = data["data"];
      },
      error => {
        console.log("Some error occured");
        console.log(error.errormessage);
        
        
      }
    )
    console.log(this.allBlogs);
  }

}
