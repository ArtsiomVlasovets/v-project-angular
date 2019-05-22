import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../shared/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass']
})
export class LoginPageComponent implements OnInit {


  form: FormGroup
  sub: Subscription

  constructor(private auth: AuthService,
              private router: Router
    ) { }

  ngOnInit() {

    this.auth.logout()

    console.log('Download login');
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  ngOnDestroy(): void {
    if(this.sub) {
      this.sub.unsubscribe()
    }
  }

  onSubmit() {


    if(this.form.invalid) {
      alert('this.form.invalid');
    }
    console.log('Submit');
    
    this.form.disable()
    this.sub = this.auth.login(this.form.value).subscribe(() => {
      this.router.navigate(['/statistics'])
    }, error => {
      this.form.enable()
      alert(error.error.message);
      console.log(error.error.message);
    })
  }
}
