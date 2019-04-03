import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyComponent } from './lazy.component';
import { LazyExplanationComponent } from './lazy-explanation/lazy-explanation.component';
import { LazyRoutingModule } from './lazy-routing.module';

@NgModule({
  declarations: [LazyComponent, LazyExplanationComponent],
  imports: [CommonModule, LazyRoutingModule, SharedModule]
})
export class LazyModule {}
