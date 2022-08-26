import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatGridListModule } from '@angular/material/grid-list';
import { GifModule } from 'src/app/modules/gif/gif.module';
import { SearchBarModule } from '../search-bar/search-bar.module';
import { FavoriteRoutingModule } from './favorite-routing.module';
import { FavoriteComponent } from './favorite.component';

@NgModule({
  declarations: [FavoriteComponent],
  imports: [CommonModule, FavoriteRoutingModule, SearchBarModule, MatGridListModule, GifModule]
})
export class FavoriteModule {}
