import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from './shared/shared.module';
import { EnvServiceProvider } from './services/env/env.service.provider';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule],
  exports: [AppRoutingModule],
  providers: [EnvServiceProvider],
  bootstrap: [AppComponent]
})
export class AppModule {}
