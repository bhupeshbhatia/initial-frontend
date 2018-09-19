import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

// intercepts http requests from the application to add a
// JWT auth token to the Authorization header if the user is logged in

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        // const currentUser = JSON.parse(localStorage.getItem('access_token'));
        const currentUser = localStorage.getItem('access_token')
        if (currentUser) {
            request = request.clone({
                setHeaders: {
                    // Authorization: `Bearer ${currentUser.access_token}`
                    Authorization: `Bearer ${currentUser}`
                }
            });
        }

        return next.handle(request);
    }

}
