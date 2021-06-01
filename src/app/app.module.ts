import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, APP_ROUTES],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
