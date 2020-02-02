import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BlogHttpService } from '../blog-http.service';

import { ActivatedRoute, Router} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})
export class BlogCreateComponent implements OnInit {
  

  constructor(private blogHttpService:BlogHttpService, private _route: ActivatedRoute, private router:Router,private toastr: ToastsManager, vcr:ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  public blogTitle : string;
  public blogBodyHtml : string;
  public blogDescription : string;
  public blogCategory : string;
  public possibleCategories = ["comedy","drama","action","technology"]
   

  ngOnInit() {
  }

  public createBlog(): any {
      
    let blogData = {
      title : this.blogTitle,
      description : this.blogDescription,
      blogBody : this.blogBodyHtml,
      category : this.blogCategory
    }

    console.log(blogData);

    this.blogHttpService.createBlog(blogData).subscribe(

      data=>{
        console.log("Blog Created");
        console.log(data);
        this.toastr.success('Blog Posted Successfully','Success!!');        
        setTimeout(()=>{
          this.router.navigate(['/blog',data.data.blogId]);
        },1000)
      },

      error => {
        console.log("Some error occured");
        console.log(error.errorMessage);
        this.toastr.error('Some error occured',"Error!!!");
      }

    )
    
  }

}
