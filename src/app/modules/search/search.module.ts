import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { SharedDirectiveModule } from 'src/app/directives/shared-directive/shared-directive.module';
import { GifModule } from 'src/app/modules/gif/gif.module';
import { SearchBarModule } from '../search-bar/search-bar.module';
import { SearchRoutingModule } from './search-routing.module';

import { SearchComponent } from './search.component';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchBarModule,
    SearchRoutingModule,
    GifModule,
    MatGridListModule,
    FlexLayoutModule,
    SharedDirectiveModule
  ]
})
export class SearchModule {}
