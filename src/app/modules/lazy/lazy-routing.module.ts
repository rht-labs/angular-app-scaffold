import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LazyComponent } from './lazy.component';

export const lazyRoutes: Routes = [
  {
    path: '',
    component: LazyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(lazyRoutes)],
  exports: [RouterModule]
})
export class LazyRoutingModule {}
