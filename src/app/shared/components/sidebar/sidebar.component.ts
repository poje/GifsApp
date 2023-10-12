import { Component } from '@angular/core';
import { Gif } from 'src/app/gifs/interfaces/gifs.interfaces';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  public listGifs: Gif[] = [];

  constructor(private gifsService: GifsService){}

  get tagsHistory(){
    return [...this.gifsService.tagsHistory]
  }


  searchTagHistory(tag: string) {
    this.gifsService.searchTag(tag);
  }

}
