import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {IvyCarouselModule} from 'angular-responsive-carousel';

import { MatSliderModule } from '@angular/material/slider';
import { HomeComponent } from './home/home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';


import { LayoutModule } from '@angular/cdk/layout';
import {MatPaginatorModule} from '@angular/material/paginator';
import {PostService} from './post.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {Globals} from './globals';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatSliderModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatToolbarModule,
        LayoutModule,
        MatPaginatorModule,
        IvyCarouselModule,
        HttpClientModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatListModule,
      MatDividerModule
    ],
  providers: [PostService, Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
