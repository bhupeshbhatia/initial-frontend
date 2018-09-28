import { TokenExtraction } from './../_helpers/token.extraction'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import * as jwt_decode from 'jwt-decode'
import { AuthResponse } from "../_models/auth-response"


// used to login and logout of the application, to login it posts the users
// credentials to the api and checks the response for a JWT token,
// if there is one it means authentication was successful so the user details
// are added to local storage with the token. The token is used by the JWT interceptor
// above to set the authorization header of http requests made to secure api endpoints


// logged in user details are stored in local storage so the user will stay logged
// in if they refresh the browser and also between browser sessions until they logout


// NEED TO CHANGE URL FOR LOGIN - DON'T FORGET

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  data: AuthResponse

  global: any
  constructor(private http: HttpClient, global: TokenExtraction) {
    this.global = global
  }

  login(resource: string) {
    console.log('-----------------')
    console.log(resource)

    console.log(this.http)
    // this.http.post('localhost:8080/users/authenticate', resource)
    //   .toPromise()
    //   .then(d => this.data)
    //   .then(data => {
    //     console.log(data.data.login)
    //     if (this.data.data.login.access_token == null) {
    //       // this.response.innerHTML = 'Invalid Credentials'
    //       console.log('invalid credentials')
    //     }
    //     else {
    //       localStorage.setItem('access_token', data.data.login.access_token)
    //       localStorage.setItem('refresh_token', data.data.login.refresh_token)
    //       return data

    //     }
    //   })



    // return
    // this.http.post<any>()
    //   .pipe(map(token => {
    //     console.log(token)
    //     // login successful if there's a jwt token in the response
    //     // if (token.access_token) {
    //     //   // store user details and jwt token in local storage to keep user logged in between page refreshes
    //     //   localStorage.setItem('access_token', token.access_token)
    //     //   this.global.parsedToken = this.global.getDecodedAccessToken()

    //     //   console.log(token.access_token)
    //     // }

    //     // return token.access_token

    //     if (token.data) {
    //       localStorage.setItem('access_token', token.data.login)
    //       this.global.parsedToken = this.global.getDecodedAccessToken()
    //     }
    //     // return token
    //   }))
  }

  // decode(token) {
  //   return jwt_decode(token)
  //     this.global.parsedToken = this.global.getDecodedAccessToken()
  // }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }

  // addInventory(addJson: string) {
  //   return this.http.post<any>(`http://localhost:4200/inventory/add-inv`, {addJson})
  //   .pipe(map(replyFromServer => {
  //     console.log(replyFromServer.reply)
  //     return replyFromServer.reply
  //   }))
  // }
}
