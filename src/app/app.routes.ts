import { DashboardComponent } from "app/dashboard/dashboard.component"
import { LoginPageComponent } from "app/login-page/login-page.component"
import { AddComponent } from "app/inventory/add/add.component"
import { UserTableComponent } from "app/employee/user-table/user-table.component"
import { InventoryRoutes } from "app/inventory/inventory.routes";

export const AppRoutes = {
  root: {
    path: '',
    title: 'Dashboard',
    component: DashboardComponent
  },

  dashboard: {
    path: 'dashboard',
    title: 'Dashboard',
    component: DashboardComponent
  },

  employee: {
    title: 'Employees',
    path: 'employee/show-employees',
    component: UserTableComponent
  },

  inventory: {
    path: 'inventory',
    title: 'Inventory',
    children: InventoryRoutes
  },

  monitoring: {
    path: 'monitoring',
    title: 'Monitoring',
    component: AddComponent
  },

  login: {
    path: 'login',
    title: 'Login',
    isPublic: true,
    component: LoginPageComponent
  }
}
