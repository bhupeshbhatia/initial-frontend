import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from "@angular/router";
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

// Material Components
import {
  MatDialogModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  MatTabsModule,
  MatCheckboxModule,
  MatPaginatorModule,
  MatButtonModule
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
    NgbModule.forRoot(),
    // Material Components
    MatCheckboxModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    MatButtonModule,
  ],
  providers: [],
  exports: [
  ],
  entryComponents:[DialogDataDialog]
})
export class EmployeeModule {}
