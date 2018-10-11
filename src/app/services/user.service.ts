import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Token } from '../models'

// method for getting all users from the api - if needed

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Token[]>(`http://localhost:4200/users`)
  }

  addInventory(data: string) {
    return this.http.post(`http://localhost:4200/inventory/add-inv`, data)
  }
}
