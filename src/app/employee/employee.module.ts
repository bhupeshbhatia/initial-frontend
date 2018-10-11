import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from "@angular/router";
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

// Material Components
import {
  MatDialogModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material'

import { UserAddComponent } from './user-add/user-add.component'
import { UserTableComponent } from './user-table/user-table.component'
import { DialogDataDialog } from './dialog-data/dialog-data.component'

@NgModule({
  declarations: [
    DialogDataDialog,
    UserAddComponent,
    UserTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Material Components
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
  ],
  providers: [],
  exports: [
  ]
})
export class EmployeeModule {}
