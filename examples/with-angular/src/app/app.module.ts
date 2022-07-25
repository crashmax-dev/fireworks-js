import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { NgFireworksModule } from '@fireworks-js/angular'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgFireworksModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
