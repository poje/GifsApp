import { Component, Input, OnInit } from '@angular/core';
import { Images } from 'src/app/gifs/interfaces/gifs.interfaces';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrls: ['./lazy-image.component.css']
})
export class LazyImageComponent implements OnInit {
  @Input()
  public url!: string;

  @Input()
  public alt: string = '';

  public hasLoaded: boolean = false

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (!this.url) throw new Error('Url property is required')
  }

  onLoad() {
    console.log('image loaded');
    this.hasLoaded = true;
  }
}
