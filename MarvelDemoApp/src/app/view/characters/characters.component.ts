import { Component, OnInit } from '@angular/core';
import { MarvelService } from '../../marvel.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  constructor(private marvelService:MarvelService) { }

  public result = [];
  public data;

  ngOnInit() {
    this.getAllCharacters();
  }

  getAllCharacters(){
    this.marvelService.getAllCharacters().subscribe((data)=>{
      this.data= data;
      console.log(this.data.data.results);

    })
  }

}
