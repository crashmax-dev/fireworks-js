import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { NgFireworksModule } from '@fireworks-js/angular'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgFireworksModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
