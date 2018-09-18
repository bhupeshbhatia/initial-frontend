import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>(`http://localhost:4200/users/authenticate`, { username, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
}
