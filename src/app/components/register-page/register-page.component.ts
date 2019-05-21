import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../shared/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.sass']
})
export class RegisterPageComponent implements OnInit {

  sub: Subscription
  form: FormGroup

  constructor( private auth: AuthService,
               private router: Router
    ) { }

  ngOnInit() {
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
    console.log('this.form.value :', this.form.value);
    
    if(this.form.invalid) {
      alert('this.form.invalid');
    }
    
    this.form.disable()
    this.sub = this.auth.register(this.form.value).subscribe(
      () => {
        alert('You can login in the system');
        this.router.navigate(['/login'])
      },
      error => {
        this.form.enable()
        console.log('error', error);
      }
    )
  }

}
