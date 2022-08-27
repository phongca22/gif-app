import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GifInfoComponent } from './gif-info.component';

const routes: Routes = [{ path: ':id', component: GifInfoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GifInfoRoutingModule {}
