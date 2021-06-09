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
  cellsToShow = 0;
  carouselHeight = 0;
  innerWidth = 0;
  innerHeight = 0;
  base64: any;
  url: any;
  reader: any;
  contentType = 'image/png';
  caption: any;
  re = /v123v123s123s123n123n123/gi;
  count = 0;
  newPosts = false;

  constructor(private postService: PostService, private sanitizer: DomSanitizer) {
    this.resize();
  }

  ngOnInit(): void {
    this.checkAvailability();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.resize();
  }

  resize(): void{
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;

    if (this.innerWidth > 1024) {
      this.cellsToShow = 5;
    }
    else {
      this.cellsToShow = 1;
    }

    if (this.innerHeight > 800) {
      this.carouselHeight = this.innerHeight;
    } else {
      this.carouselHeight = 800;
    }
  }

  async getData(): Promise<any> {
    this.postService.getPosts().subscribe(async res => {
        for (let i = 0; i < res.length; i++) {
          if (res[i][1] === 0) {
            const blob = base64StringToBlob(res[i][0][0].slice(2, -1), this.contentType);
            const objectURL = URL.createObjectURL(blob);
            this.imgP = this.sanitizer.bypassSecurityTrustUrl(objectURL);
            this.caption = res[i][0][1].replace(this.re, '<br />');
            this.cards.push([this.imgP, this.caption, res[i][0][2], res[i][0][3]]);
            // console.log('Card pushed - ', i);
          } else {
            break;
          }
        }
        // console.log('Cards array made');
        this.flag = true;
      },
      console.error
    );
  }

  refreshData(): any {
    // console.log('starting...');
    this.postService.getPosts().subscribe(res => {
        this.cards2 = [];
        for (let j = 0; j < res.length; j++) {
          if (res[j][1] === 0) {
            const blob = base64StringToBlob(res[j][0][0].slice(2, -1), this.contentType);
            const objectURL = URL.createObjectURL(blob);
            this.imgP = this.sanitizer.bypassSecurityTrustUrl(objectURL);
            this.caption = res[j][0][1].replace(this.re, '<br />');
            this.cards2.push([this.imgP, this.caption, res[j][0][2], res[j][0][3]]);
          } else {
            break;
          }
        }
        // console.log('Cards array made');
        this.cards = this.cards2;
        this.flag = true;
        // window.location.reload();
      },
      console.error
    );
  }

  checkAvailability(): any {
    this.dataRefresher = setInterval(() => {
     this.postService.getCount().subscribe(async res => {
       // console.log('res - ', res);
       // console.log('this.count - ', this.count);
       if (res !== this.count){
         this.count = res;
         this.refreshData();
       }
     }, console.error);
    }, 60000);
  }


  ngOnDestroy(): void {
    if (this.dataRefresher) {
      clearInterval(this.dataRefresher);
    }
  }

  fun(): void {
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
