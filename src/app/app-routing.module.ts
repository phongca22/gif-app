import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'trending'
  },
  { path: 'search', loadChildren: () => import('./modules/search/search.module').then((m) => m.SearchModule) },
  { path: 'trending', loadChildren: () => import('./modules/trending/trending.module').then((m) => m.TrendingModule) },
  { path: 'favorite', loadChildren: () => import('./modules/favorite/favorite.module').then(m => m.FavoriteModule) },
  { path: 'upload', loadChildren: () => import('./modules/upload/upload.module').then(m => m.UploadModule) },
  { path: 'collection', loadChildren: () => import('./modules/collection/collection.module').then(m => m.CollectionModule) },
  { path: 'gif-info', loadChildren: () => import('./modules/gif-info/gif-info.module').then(m => m.GifInfoModule) },
  { path: '**', redirectTo: 'trending' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
