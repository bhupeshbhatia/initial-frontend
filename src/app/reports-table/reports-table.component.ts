import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core'
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material'
import { Http } from '@angular/http'
import { LoadInventoryJsonService } from '../services/load-inventory-json/load-inventory-json.service'
import { Inventory } from "../models/inventory"
import { SelectionModel } from '@angular/cdk/collections'
import { Observable, of } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import swal from "sweetalert";
import { SearchDataToTableService } from "../services/search-data-to-table/search-data-to-table.service";
import MockUtils from "../reports/mocks";
var Food: Inventory[] = []

@Component({
  selector: 'app-reports-table',
  templateUrl: './reports-table.component.html',
  styleUrls: ['./reports-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ReportsTableComponent implements OnInit {

  dtOptions: any = {};
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  expandedElement: any;
  @ViewChild('table') table: any
  @Input() displayedColumns: string[]
  @Input() jsonFields: string[]
  ethyData: any

  //add device ID to shown rows
  dataSource = new MatTableDataSource()
  today: number = Date.now()
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  @ViewChild("query") query: ElementRef
  @ViewChild("field") field: ElementRef
  @ViewChild("formDate") formDate: ElementRef


  selection = new SelectionModel<Inventory>(true, [])

  constructor(private http: Http, private loadInventoryJsonService: LoadInventoryJsonService,
     public dialog: MatDialog, private searchData:SearchDataToTableService) {
    }

  ngOnInit(): void {
            var mock = new MockUtils()
            console.log(mock.genEthyData())
            this.ethyData = mock.genEthyData()
            this.dataSource.data = this.ethyData
    // this.loadInventoryJsonService.getJsonTest()
    //   .subscribe(data => {
        // console.log(data)
        // for(var elem in data){
        //   if(data.hasOwnProperty(elem)){
        //     data[elem].timestamp = new Date(data[elem].timestamp * 1000).toISOString().split("T")[0]
        //     data[elem].date_arrived = new Date(data[elem].date_arrived * 1000).toISOString().split("T")[0]
        //   }
        // }
       // console.log(data)
        // this.dataSource.data = this.mock.genEthyData()
        // Food = data
      //})
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
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

}
