import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';

// This would be a good place to import angular forms, material UI stuff etc.

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule],
  exports: [HeaderComponent] // You must remember to export each component from the shared module
})
export class SharedModule {}
