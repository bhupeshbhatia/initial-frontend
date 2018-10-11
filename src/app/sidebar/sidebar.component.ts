import { Component, OnInit } from '@angular/core'

import { AppRoutes } from '../app.routes'
import { JWTService } from '../_Auth/jwt.service';
import { User } from '../_Auth/User.model'

@Component({
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  private jwt: JWTService
  public user: User

  public routes: any
  public menuItems: any
  public routeIconDef = [
    {
      route: AppRoutes.dashboard,
      icon: 'nc-icon nc-bank'
    },
    {
      route: AppRoutes.employee,
      icon: 'nc-icon nc-user-run',
      children: [
        {
          route: AppRoutes.employee.children.add,
          ab: 'AD'
        },
        {
          route: AppRoutes.employee.children.show,
          ab: 'V'
        }
      ]
    },
    {
      route: AppRoutes.inventory,
      icon: 'nc-icon nc-box-2',
      children: [
        {
          route: AppRoutes.inventory.children.add,
          ab: 'AD'
        },
        {
          route: AppRoutes.inventory.children.view,
          ab: 'V'
        }
      ]
    },
    {
      route: AppRoutes.monitoring,
      icon: 'nc-icon nc-tv-2'
    },
  ]

  constructor(jwt: JWTService) {
    this.jwt = jwt
  }

  upperFirstLetter = (word: string): string => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }

  ngOnInit() {
    this.routes = AppRoutes

    const token = this.jwt.getAccessToken()
    console.log('AccessToken:', token)

    const fName = this.upperFirstLetter(token.first_name)
    const lName = this.upperFirstLetter(token.last_name)
    const role = this.upperFirstLetter(token.role)
    this.user = {
      firstName: fName,
      lastName: lName,
      role: role
    }
  }
}
