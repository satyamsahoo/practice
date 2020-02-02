import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Naruto} from './naruto'
import {Characters} from './mock-characters';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private messageService: MessagesService) { }

  getBlog() : Observable<Naruto[]> {
    this.messageService.add('HeroService : fetched Heros')
    return of(Characters);
  }

  getBlogId(id: number): Observable<Naruto>{
    this.messageService.add(`HeroService add: fetch heroid= ${id}`);
    return of(Characters.find(blog=> blog.id===id))
  }
}
