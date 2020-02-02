import { Component, OnInit, Input, Output, EventEmitter, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-first-char',
  templateUrl: './first-char.component.html',
  styleUrls: ['./first-char.component.css']
})
export class FirstCharComponent implements OnInit {

  @Input() name1 : string;

  @Output()
  notify : EventEmitter<String> = new EventEmitter<String>();

  public firstChar : string;

  constructor() { }

  ngOnInit() {
    this.firstChar = this.name1[0];
    console.log('firstcharcomponent');
    console.log(this.firstChar);
    
    
  }


  nameClicked(){
    this.notify.emit(this.name1);
  }

}
