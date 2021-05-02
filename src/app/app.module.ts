import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxSuperCroppieModule } from 'ngx-super-croppie';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxSuperCroppieModule],
  providers: [NgxSuperCroppieModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
