import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class TokenExpiry {
    getToken(): string {
        return localStorage.getItem('currentUser');
    }

    getDecodedAccessToken(token: any) {
        try {
            return jwt_decode(this.getToken());
        } catch (Error) {
            return null;
        }
    }
    getTokenExpirationDate(token: any): Date {

        if (token.exp === undefined) {
            return null;
        }

        const date = new Date(0);
        date.setUTCSeconds(token.exp);
        return date;
    }

    isTokenExpired(token: any) {
        const decodedToken = this.getDecodedAccessToken(token); // decode token
        const date = this.getTokenExpirationDate(decodedToken)

        if (date === undefined) {
            return false;
        }

        return !(date.valueOf() > new Date().valueOf());
    }



}
