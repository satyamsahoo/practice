import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor( public blogService : BlogService) { }

  public blogTitle: string;
  public blogBodyHtml : string;
  public blogDescription : string;
  public blogCategory : string = "Comedy";

  ngOnInit() {
  }

  public createBlog():any{

    let blogData = {
      title: this.blogTitle,
      blogBody : this.blogBodyHtml,
      description : this.blogDescription,
      category : this.blogCategory
    }

    console.log(blogData);

    this.blogService.createBlog(blogData).subscribe(
      data=>{
        console.log("Blog Created");
        console.log(data);
        
      },
      error=>{
        console.log("Some error occured");
        console.log(error.errorMessage);
        
      }
    )
    
  }

}
