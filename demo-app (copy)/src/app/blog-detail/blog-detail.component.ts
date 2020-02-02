import { Component, OnInit , Input} from '@angular/core';
import { Naruto} from '../naruto';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BlogService }  from '../blog.service';



@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  blog : Naruto;

  constructor(private route: ActivatedRoute, private blogService: BlogService, private location
    : Location) { }

  ngOnInit() {
    this.getBlog();
  }

  getBlog():void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.blogService.getBlogId(id)
      .subscribe(blog => this.blog = blog);
  }

  goBack(): void {
    this.location.back();
  }
  

}
