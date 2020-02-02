import { Component, OnInit } from '@angular/core';
import { BlogService} from '../blog.service';
import {Naruto} from '../naruto';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.getBlog();
  }

  characters : Naruto[];

  getBlog() : void {
    this.blogService.getBlog().subscribe(
      char => this.characters = char.slice(1,5)
    );

    console.log('Dashboard component')
  }




}
