import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material'
import { Http } from '@angular/http'
import { LoadInventoryJsonService } from '../../services/load-inventory-json/load-inventory-json.service'
import { Inventory } from "../../models/inventory"
import { SelectionModel } from '@angular/cdk/collections'
import { DialogDataDialog } from "../dialog-data/dialog-data.component";
import swal from "sweetalert";

var Food: Inventory[] = []

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})

export class ShowComponent implements OnInit {
  food: Inventory
  //add device ID to shown rows
  displayedColumns: string[] =
  ['select','upc', 'sku', 'name', 'origin' ,'location', 'date_arrived', 'expiry_date', 'sale_price', 'total_weight', 'modify']
  dataSource = new MatTableDataSource()
  today: number = Date.now()
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  @ViewChild("query") query: ElementRef
  @ViewChild("field") field: ElementRef
  @ViewChild("formDate") formDate : ElementRef

  selection = new SelectionModel<Inventory>(true, [])

  constructor(private http: Http, private loadInventoryJsonService: LoadInventoryJsonService, public dialog: MatDialog) {
  }

  ngOnInit(): void{
    this.loadInventoryJsonService.getJSON()
      .subscribe(data => {
        console.log(data)
        this.dataSource.data = data
        Food = data
      })
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
}

  getData(): void {
    this.loadInventoryJsonService.getJSON()
      .subscribe(data => {
        console.log(data)
        this.dataSource.data = data
        Food = data
      })
  }

  getSearchData(query, field) {
    this.loadInventoryJsonService.getSearchJSON(query, field)
      .subscribe(data => {
        console.log(data)
        this.dataSource.data = data
        Food = data
      })
  }

  resetData(){
    this.loadInventoryJsonService.getJSON()
      .subscribe(data => {
        console.log(data)
        this.dataSource.data = data
        Food = data
      })
  }

  //make method more efficient in future
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
            let index: number = Food.findIndex(d => d === item)
            console.log("++++++++++++++++++==")
             this.loadInventoryJsonService.deleteRow(item.item_id)
          })
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Inventory not removed");
        }
      });
  }

  populateFields(e): Inventory {
    console.log(e)
    if (e != null) {
      this.curField = Food.filter(i => i.item_id === e)[0]
      this.dialog.open(DialogDataDialog, {
        width: '500px',
        data: {
          data: this.curField
        }
      }).afterClosed().subscribe(result => {
        this.loadInventoryJsonService.getJSON()
          .subscribe(data => {
            console.log(data)
            this.dataSource.data = data
            Food = data
          })
      })
    }
    return e
  }

  onSearch() {
    var query = this.query.nativeElement.value
    var field = this.field.nativeElement.value
    this.getSearchData(query, field)
  }

 curField: any

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
}