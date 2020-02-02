import { Component, OnInit } from '@angular/core';
import { BlogService} from '../blog.service';
import {Naruto} from '../naruto';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css']
})
export class ViewBlogComponent implements OnInit {

  constructor(private blogService : BlogService) { }

  ngOnInit() {
    this.getBlog();
  }

  characters : Naruto[];

  getBlog() : void {
    this.blogService.getBlog().subscribe(
      char => this.characters = char
    );
  }

 
}
