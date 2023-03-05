import { Component, ViewChild } from '@angular/core'
import type {
  FireworksDirective,
  FireworksOptions
} from '@fireworks-js/angular'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  enabled = true
  options: FireworksOptions = {
    opacity: 0.5
  }

  @ViewChild('fireworks') fireworks?: FireworksDirective

  toggleFireworks(): void {
    this.enabled = !this.enabled
  }

  waitStop(): void {
    this.fireworks?.waitStop()
  }
}
