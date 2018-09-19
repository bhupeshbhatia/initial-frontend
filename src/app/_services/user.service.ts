import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Token } from '../_models';

// method for getting all users from the api - if needed

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Token[]>(`http://localhost:4200/users`);
  }
}
