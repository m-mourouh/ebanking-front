import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ebanking-front';

  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.authService.loadJwtTokenFromLocalStorage();
  }
}
