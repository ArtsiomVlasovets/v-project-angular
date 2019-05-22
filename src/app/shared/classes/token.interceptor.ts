import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable, throwError, pipe } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class 
TokenInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService, 
                private router: Router
                ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('intercept');
        
        // if(this.auth.isAuthenticated()) {
        //     req = req.clone({
        //         setHeaders: {
        //             Authorization: `Bearer ${this.auth.getToken()}`
        //         }
        //     })
        // }
        return next.handle(req).pipe(
            catchError(
                (error: HttpErrorResponse) => this.handleError(error)
            )
        )      
    }

    private handleError(error: HttpErrorResponse): Observable<any> {
        console.log('intercepterror', error);
        if (error.status === 401) {
            const potentialRefreshToken = localStorage.getItem('refresh-token') 

            if(potentialRefreshToken) {
                console.log('potentialRefreshToken :', potentialRefreshToken);
                const sub = this.auth.refresh(localStorage.getItem('refresh-token')).subscribe(
                    () => {
                        alert('Tokens was changed')
                      }, error => {
                        alert(error.error.message);
                        if(error.error.message === 'refresh-token is invalid') {
                            this.auth.logout();
                            this.redirect();
                        } 
                        sub.unsubscribe()
                        console.log(error.error.message);
                      }
                )
            } else {
                this.redirect()
            }
            
        }

        return throwError(error)
    }

    private redirect() {
        this.router.navigate(['/login'], {
            queryParams: {
                tokensFailed: true
            }
        })
    }



}