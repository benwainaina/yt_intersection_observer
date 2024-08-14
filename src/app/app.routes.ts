import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'infinitescroll',
    loadComponent: () =>
      import(
        '../../projects/infinite-scroll/src/lib/infinite-scroll.component'
      ).then((c) => c.InfiniteScrollComponent),
  },
  {
    path: 'tnc',
    loadComponent: () =>
      import('../../projects/tnc/src/lib/tnc.component').then(
        (c) => c.TncComponent
      ),
  },
  { path: '', pathMatch: 'full', redirectTo: 'tnc' },
];
