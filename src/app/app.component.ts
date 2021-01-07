import { Component } from '@angular/core';
import {of, pipe} from "rxjs";
import {filter, map} from "rxjs/operators";

const nums = of(1, 2, 3, 4, 5);
// Create a function that accepts an Observable.
const squareOddVals = pipe(
  filter((n: number) => n % 2 !== 0),
  map(n => n * n)
);
// Create an Observable that will run the filter and map functions
const squareOdd = squareOddVals(nums);

console.log("Nadeeja");
squareOdd.subscribe(x => console.log(x));

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'deals-app';
}
