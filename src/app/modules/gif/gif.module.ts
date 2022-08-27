import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GifComponent } from './gif.component';
import { GifFavoriteComponent } from './gif-favorite/gif-favorite.component';
import { RemoveDialogComponent } from './remove-dialog/remove-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [GifComponent, GifFavoriteComponent, RemoveDialogComponent],
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
