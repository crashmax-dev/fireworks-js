import { Component } from '@angular/core'
import type { FireworksProps } from '@fireworks-js/angular'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  enabled = true
  options: FireworksProps = {
    opacity: 0.5
  }

  public toggleFireworks(): void {
    this.enabled = !this.enabled
  }
}
