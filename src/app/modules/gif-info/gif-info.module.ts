import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GifModule } from '../gif/gif.module';
import { GifInfoRoutingModule } from './gif-info-routing.module';
import { GifInfoComponent } from './gif-info.component';

@NgModule({
  declarations: [GifInfoComponent],
  imports: [
    CommonModule,
    GifInfoRoutingModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    GifModule
  ]
})
export class GifInfoModule {}
