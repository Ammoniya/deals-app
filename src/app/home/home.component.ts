import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {PostService} from '../post.service';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {DomSanitizer} from '@angular/platform-browser';
import {base64StringToBlob} from 'blob-util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {

  cards: any = [];
  cards2: any = [];
  flag = false;
  mode: ProgressSpinnerMode = 'indeterminate';
  dataRefresher: any;
  imgP: any;

  facebookUrl = 'https://www.facebook.com/Offerte-Nerd-102054568555199';
  instagramUrl = 'https://www.instagram.com/offerte_nerd/';
  twitterUrl = 'https://twitter.com/NerdOfferte';
  telegramUrl = 'https://t.me/offerte_nerd';
  cellsToShow: number;
  carouselHeight: number;
  innerWidth: number;
  innerHeight: number;
  base64: any;
  url: any;
  reader: any;
  contentType = 'image/png';
  caption: any;
  re = /v123v123s123s123n123n123/gi;

  constructor(private postService: PostService, private sanitizer: DomSanitizer) {

    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;

    console.log('innerWidth - ', this.innerWidth);
    console.log('innerHeight - ', this.innerHeight);

    if (this.innerWidth > 1024){
      this.cellsToShow = 5;
    }
    // else if (this.innerWidth > 700){
    //   this.cellsToShow = 2;
    // }
    else{
      this.cellsToShow = 1;
    }

    if (this.innerHeight > 800){
      this.carouselHeight = this.innerHeight;
    }
    else{
      this.carouselHeight = 800;
    }

    console.log(this.cellsToShow);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;

    console.log('innerWidth - ', this.innerWidth);
    console.log('innerHeight - ', this.innerHeight);

    if (this.innerWidth > 1024){
      this.cellsToShow = 5;
    }
    // else if (this.innerWidth > 700){
    //   this.cellsToShow = 2;
    // }
    else{
      this.cellsToShow = 1;
    }

    if (this.innerHeight > 800){
      this.carouselHeight = this.innerHeight;
    }
    else{
      this.carouselHeight = 800;
    }

    console.log(this.cellsToShow);
  }

  ngOnInit(): void {
    this.getData();
    this.refreshData();

  }

  async getData(): Promise<any>{
    this.postService.getPosts().subscribe(async res => {
      console.log('len - ', res.length);
      for (let i = 0; i < res.length; i++){
        const blob = base64StringToBlob(res[i][0].slice(2, -1), this.contentType);
        const objectURL = URL.createObjectURL(blob);
        this.imgP = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        this.caption = res[i][1].replace(this.re, '<br />');
        await this.delay(5000);
        this.flag = true;
        this.cards.push([this.imgP, this.caption, res[i][2], res[i][3]]);
      }
      },
      console.error
    );
  }

  refreshData(): any{
    this.dataRefresher = setInterval(() => {
      this.postService.getPosts().subscribe(res => {
        this.cards2 = [];
        for (let j = 0; j < res.length; j++){
          const blob = base64StringToBlob(res[j][0].slice(2, -1), this.contentType);
          const objectURL = URL.createObjectURL(blob);
          this.imgP = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          this.caption = res[j][1].replace(this.re, '<br />');
          this.cards2.push([this.imgP, this.caption, res[j][2], res[j][3]]);
          }
        this.cards = this.cards2;
        },
        console.error
      );
    }, 60000);
  }

  ngOnDestroy(): void{
    if (this.dataRefresher){
      clearInterval(this.dataRefresher);
    }
  }

  fun(): void{
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
