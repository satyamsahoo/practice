import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Md5} from 'ts-md5/dist/md5';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  constructor(private http:HttpClient) { }

  private baseUrl ='http://gateway.marvel.com';
  private ts = 1;
  private privateKey='f8377ca13358aad08908ee8c20c0636423fa8e8c';
  private apiKey='e72e146e7be2e71c9680f4ef28a1615d';
  private hash = Md5.hashStr(this.ts+this.privateKey+this.apiKey)
  

  getAllCharacters = () =>{
    console.log(this.hash)
    return this.http.get(`${this.baseUrl}/v1/public/characters?ts=1&apikey=${this.apiKey}&hash=${this.hash}`);
  }
}