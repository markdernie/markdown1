import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Top1Component } from './components/top1/top1.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Top1Component
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'markdown1';
}
