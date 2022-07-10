import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { FireworksModule } from '@fireworks-js/angular'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FireworksModule.withConfig({ opacity: 0 })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
