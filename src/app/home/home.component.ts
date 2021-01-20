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

  facebookUrl = 'https://www.facebook.com/Offerte-Nerd-102054568555199';
  instagramUrl = 'https://www.instagram.com/offerte_nerd/';
  twitterUrl = 'https://twitter.com/NerdOfferte';
  telegramUrl = 'https://t.me/offerte_nerd';
  cellsToShow: number;
  innerWidth: any;

  constructor(private postService: PostService) {

    this.innerWidth = window.innerWidth;

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

  }

  async getData(): Promise<any>{

    this.postService.getPosts().subscribe(async res => {
        for (const i of res) {
          this.cards.push({link: i[0], caption: i[2]});
        }
        await this.delay(5000);
        this.flag = true;
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
