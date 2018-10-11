import { Component, OnInit, ViewChild } from '@angular/core'
import { MatSort, MatSortable, MatTableDataSource, MatDialog } from '@angular/material'
import { Employee } from "../../models/employee";
import { SelectionModel } from '@angular/cdk/collections'
import { DialogDataDialog } from "../dialog-data/dialog-data.component";
import swal from "sweetalert";

var Employees: Employee[] = []

@Component({
  selector: 'component-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  constructor(public dialog: MatDialog){

  }

  selection = new SelectionModel<Employee>(true, [])

  displayedColumns = ['select', 'first_name', 'last_name', 'username', 'email', 'role', 'modify']
  ELEMENT_DATA: Employee[] = [
    {
      first_name: 'Danny', last_name: 'Santhos', username: 'dsanthos', email: 'dsanthos@gmail.com', role: 'Corporate'
    },
    {
      first_name: 'Bob', last_name: 'Santhos', username: 'bsanthos', email: 'bsanthos@gmail.com', role: 'Corporate'    },
    {
      first_name: 'Manny', last_name: 'Santhos', username: 'msanthos', email: 'msanthos@gmail.com', role: 'Corporate'    },
    {
      first_name: 'Nanny', last_name: 'Santhos', username: 'nsanthos', email: 'nsanthos@gmail.com', role: 'Corporate'    },
    {
      first_name: 'Tammy', last_name: 'Santhos', username: 'tsanthos', email: 'tsanthos@gmail.com', role: 'Corporate'    },
    {
      first_name: 'Nando', last_name: 'Santhos', username: 'nsanthos', email: 'nsanthos@gmail.com', role: 'Corporate'    }
  ]
  dataSource = new MatTableDataSource(this.ELEMENT_DATA)
  curField: any
  populateFields(e): Employee {
    console.log(e)
    if (e != null) {
      this.curField = this.ELEMENT_DATA.filter(i => i.email === e)[0]
      console.log(this.curField)
      this.dialog.open(DialogDataDialog, {
        data: {
          data: this.curField
        }
      });
      // this.formDate.nativeElement.value = this.curField.date_arrived
      console.log()
    }
    return e
  }

  removeSelectedRows() {

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: ["Yes", "No"],
      dangerMode: true,
    })
      .then((willDelete) => {
        if (!willDelete) {
          this.selection.selected.forEach(item => {
            let index: number = Employees.findIndex(d => d === item)
            console.log("++++++++++++++++++==")
            // this.loadInventoryJsonService.deleteRow(item.item_id)
          })
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Inventory not removed");
        }
      });
  }


  isAllSelected() {
    const numSelected = this.selection.selected.length
    const numRows = this.dataSource.data.length
    return numSelected == numRows
  }

  /** Selects all rows if they are not all selected otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach((row: any) => this.selection.select(row))
  }

  @ViewChild(MatSort) sort: MatSort

  ngOnInit(): void {
    this.dataSource.sort = this.sort
  }
}
