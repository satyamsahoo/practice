import { Component } from '@angular/core';
import { Naruto } from './naruto';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demo-app';
  anime = 'Naruto';
  narutoChar = [
    new Naruto(1,'naruto'),
    new Naruto(2,'Sasuke')
  ];
  myNarutoChar = this.narutoChar[1]
}

