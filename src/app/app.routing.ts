import { NgModule } from '@angular/core'
import { RouterModule, Routes, Route } from '@angular/router'

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component'
import { AuthGuard } from './_Auth/auth.guard'
import { AppRoutes } from './../app/app.routes'

function createModuleRoutes(routeDef: any) {
  return Object.keys(routeDef)
    .reduce((routes: any, routeName: any): Route[] => {
      const route = routeDef[routeName]

      const hasChildren = route.children &&
        Object.keys(route.children).length > 0
      if (hasChildren) {
        const newRoute = {
          path: route.path,
          component: route.component,
          canActivate: route.isPublic ? [AuthGuard] : null,
          children: createModuleRoutes(route.children)
        }
        return routes.concat(newRoute)
      }

      return routes.concat({
        path: route.path,
        component: route.component,
        canActivate: route.isPublic ? [AuthGuard] : null
      })
    },
    []
    )
}

@NgModule({
    imports: [RouterModule.forRoot(
      [
        {
          path: '',
          component: AdminLayoutComponent,
          children: createModuleRoutes(AppRoutes)
        }
      ]
    )],
    exports: [RouterModule]
})

export class AppRoutingModule { }
