import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

  title = 'BasketBrest';

  constructor(private auth: AuthService) {}

    ngOnInit() {
      const token = localStorage.getItem('auth-token')
      if(token) {
        this.auth.setToken(token)
      }
    }
  
}
