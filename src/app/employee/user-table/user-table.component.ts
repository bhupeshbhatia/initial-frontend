import { Component, OnInit, ViewChild } from '@angular/core'
import { MatSort, MatSortable, MatTableDataSource } from '@angular/material'
import { Employee } from "../../models/employee";

@Component({
  selector: 'component-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  displayedColumns = ['username', 'name', 'accountType']
  ELEMENT_DATA: Element[] = [
    {
      username: 'danny.santhos', name: 'Danny Santhos', accountType: 'Corporate'
    },
    {
      username: 'kevin.timmins', name: 'Kevin Timmins', accountType: 'Corporate'
    },
    {
      username: 'keylly74', name: 'Kelly River', accountType: 'Employee'
    },
    {
      username: 'josh.s', name: 'Josh Stones', accountType: 'Employee'
    },
    {
      username: 'some.dude', name: 'Some Dude', accountType: 'Employee'
    },
    {
      username: 'martha.smith', name: 'Martha Smith', accountType: 'Manager'
    }
  ]
  dataSource = new MatTableDataSource(this.ELEMENT_DATA)

  // curField: any
  // populateFields(e): Employee {
  //   console.log(e)
  //   if (e != null) {
  //     this.curField = Food.find(() => e)
  //     this.dialog.open(DialogDataDialog, {
  //       data: {
  //         data: this.curField
  //       }
  //     });
  //     console.log(this.curField)
  //     console.log(this.curField.date_arrived)
  //     // this.formDate.nativeElement.value = this.curField.date_arrived
  //     console.log()
  //   }
  //   return e
  // }

  @ViewChild(MatSort) sort: MatSort

  ngOnInit(): void {
    this.dataSource.sort = this.sort
  }
}
export interface Element {
  username: String
  name: String
  accountType: String
}
