import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GifFavoriteComponent } from './gif-favorite/gif-favorite.component';
import { GifComponent } from './gif.component';

@NgModule({
  declarations: [GifComponent, GifFavoriteComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatDialogModule
  ],
  exports: [GifComponent, GifFavoriteComponent]
})
export class GifModule {}
