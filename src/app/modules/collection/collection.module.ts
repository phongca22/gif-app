import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { GifModule } from '../gif/gif.module';
import { CollectionRoutingModule } from './collection-routing.module';
import { CollectionComponent } from './collection.component';

@NgModule({
  declarations: [CollectionComponent],
  imports: [CommonModule, CollectionRoutingModule, FlexLayoutModule, MatGridListModule, GifModule]
})
export class CollectionModule {}
