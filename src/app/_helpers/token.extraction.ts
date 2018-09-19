import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';


@Injectable()
export class TokenExtraction {

    parsedToken: any

    getToken(): string {
        return localStorage.getItem('access_token');
    }

    getDecodedAccessToken(): Object {
        // try {
        //     return jwt_decode(this.getToken());
        // } catch (Error) {
        //     return 'Error decoding token';
        // }
        return jwt_decode(this.getToken());
    }

    // isTokenExpired(): boolean{
    //     const deToken = this.getDecodedAccessToken()

    //     if (deToken.exp === undefined) {
    //         return true;
    //     }


    //     const date = new Date(0);
    //     date.setUTCSeconds(deToken.exp);
    // return date;
    // }

    getUserInfo(): any {
        if !(this.parsedToken){
            return this.getDecodedAccessToken()

        }
        return this.parsedToken

    }





    // getTokenExpirationDate(token: any): Date {

    //     if (token.exp === undefined) {
    //         return null;
    //     }

    //     const date = new Date(0);
    //     date.setUTCSeconds(token.exp);
    //     return date;
    // }

    // isTokenExpired(token: any) {
    //     const decodedToken = this.getDecodedAccessToken(token); // decode token
    //     const date = this.getTokenExpirationDate(decodedToken)

    //     if (date === undefined) {
    //         return false;
    //     }

    //     return !(date.valueOf() > new Date().valueOf());
    // }



}
