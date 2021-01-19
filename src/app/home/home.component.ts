import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {PostService} from '../post.service';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {Observable} from 'rxjs';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

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

  facebookUrl = 'https://www.facebook.com';
  instagramUrl = 'https://www.instagram.com';
  twitterUrl = 'https://twitter.com';
  telegramUrl = 'https://web.telegram.org/';
  cellsToShow: number;
  innerWidth: any;

  constructor(private postService: PostService, private breakpointObserver: BreakpointObserver) {
    // const isSmallScreen = breakpointObserver.isMatched('(max-width: 599px)');
    // // const isLargeScreen = breakpointObserver.isMatched('(max-width: 1000px)');

    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth);

    if (this.innerWidth > 1000){
      this.cellsToShow = 5;
    }
    else{
      this.cellsToShow = 1;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.innerWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.getData();
    this.refreshData();
    console.log(this.cards);

  }

  async getData(): Promise<any>{

    this.postService.getPosts().subscribe(async res => {
        for (const i of res) {
          this.cards.push({link: i[0], caption: i[2]});
          console.log(i[2]);
        }
        await this.delay(5000);
        this.flag = true;
        console.log(this.cards);
      },
      console.error
    );
  }

  refreshData(): any{
    this.dataRefresher = setInterval(() => {
      this.postService.getPosts().subscribe(res => {
          this.cards2 = [];
          for (const i of res) {
            this.cards2.push({link: i[0], caption: i[2]});
            console.log(i[2]);
          }
          this.cards = this.cards2;
          console.log(this.cards);
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
    // console.log('Nadeeja');
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
