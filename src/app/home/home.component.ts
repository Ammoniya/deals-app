import { Component } from '@angular/core';
import {filter, map} from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import {Observable, of, pipe} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  cards: Observable<any>;
  n:number = 10;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(() => {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      })
    );

    // for (let i = 0; i < this.n; i++) {
    //   this.cards.pipe(map(() => {
    //     { title: 'Card 1', cols: 1, rows: 1 }
    //   }));
    // }
  }
}
