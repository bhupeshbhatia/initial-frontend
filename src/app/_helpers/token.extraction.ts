import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class TokenExtraction {

    parsedToken: any

    getAccessToken(): string {
        return localStorage.getItem('access_token');
    }

    getRefreshToken(): string {
        return localStorage.getItem('refresh_token')
    }

    getDecodedAccessToken(): any {
        const accessToken = localStorage.getItem('access_token')
        return jwt_decode(accessToken)
    }

    isTokenExpired(): boolean{
        const deToken = this.getDecodedAccessToken()

        if (deToken.exp === undefined) {
            return true
        }

        const date = new Date(0)
        date.setUTCSeconds(deToken.exp)
        console.log('********************')
        console.log(date.valueOf)
        return !(date.valueOf() > new Date().valueOf())
    }

    getUserInfo(): any {
        if (!this.parsedToken){
            return this.getDecodedAccessToken()

        }
        return this.parsedToken

    }
}
