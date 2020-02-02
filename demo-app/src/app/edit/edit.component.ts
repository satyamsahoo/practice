import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public currentBlog;
  public editedBlog;
  public currentBlogId;

  constructor(public blogService : BlogService, public router:ActivatedRoute) {}

  public blogTitle: string;
  public blogBodyHtml : string;
  public blogDescription : string;

  ngOnInit() {
    this.currentBlogId = this.router.snapshot.paramMap.get('blogId');
    console.log(this.currentBlogId);
    
    this.currentBlog = this.blogService.getSingleBlog(this.currentBlogId).subscribe(
      data =>{
        this.currentBlog = data["data"];
        console.log(this.currentBlog);
        
      },
      error=>{
        console.log('Some error occured');
        console.log(error.errorMessage);
        
        
      }
    )
  }

  public editBlog(): any{

    
    

    this.editedBlog = this.blogService.editBlog(this.currentBlogId,this.currentBlog).subscribe(
      data=>{
        console.log(data);
        console.log('Success');
      },
      error=>{
        console.log('Some error occured');
        console.log(error.errorMessage);
        
      }
    )
    
  }

}
