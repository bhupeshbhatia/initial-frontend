import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http'
import { Observable } from 'rxjs'
import { TokenExtraction } from '../_helpers/token.extraction'

// intercepts http requests from the application to add a
// JWT auth token to the Authorization header if the user is logged in

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    tokenextract = new TokenExtraction()
    // constructor(tokenextract: TokenExtraction){
    //     this.tokenextract = tokenextract
    // }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        // const currentUser = JSON.parse(localStorage.getItem('access_token'))


        let token = this.tokenextract.getAccessToken()
        // console.log(this.tokenextract.isTokenExpired())
        if (token) {
            // if (!this.tokenextract.isTokenExpired()) {
                console.log('&&&&&&&&&&&&&&&&&&&&&&&&&')
                console.log(this.tokenextract.isTokenExpired())
                request = request.clone({
                    setHeaders: {
                        // Authorization: `Bearer ${currentUser.access_token}`
                        Authorization: `Bearer ${token}`
                    }
                })
            // } else {
            //     token = this.tokenextract.getRefreshToken()
            //     request = request.clone({
            //         setHeaders: {
            //             // Authorization: `Bearer ${currentUser.access_token}`
            //             Authorization: `Bearer ${token}`
            //         }
            //     })
            // }
        }
        return next.handle(request)
    }

}
