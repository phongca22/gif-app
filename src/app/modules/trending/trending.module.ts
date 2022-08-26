import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SharedDirectiveModule } from 'src/app/directives/shared-directive/shared-directive.module';
import { GifModule } from '../gif/gif.module';
import { SearchBarModule } from '../search-bar/search-bar.module';
import { TrendingRoutingModule } from './trending-routing.module';
import { TrendingComponent } from './trending.component';

@NgModule({
  declarations: [TrendingComponent],
  imports: [
    CommonModule,
    MatGridListModule,
    GifModule,
    SearchBarModule,
    TrendingRoutingModule,
    FlexLayoutModule,
    SharedDirectiveModule,
    MatProgressBarModule
  ]
})
export class TrendingModule {}
