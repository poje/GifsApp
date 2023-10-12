import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = '42ZLsumEZcGw2bxSa4ogB4yUskLj8Iib'
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs'

  constructor(private https: HttpClient) {
    this.loadLocalStorage();

    if (this._tagsHistory.length === 0) return;

    this.searchTag(this._tagsHistory[0]);

    console.log('Gifs Service Ready')
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter( (oldtag) => oldtag !== tag)
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0,10);

    this.saveLocalStorage();
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')! );
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    this.https.get<SearchResponse>(`${this.serviceUrl}/search`, { params })  // { params: params}
      .subscribe( resp => {
        this.gifList = resp.data;
      })

  }

}
