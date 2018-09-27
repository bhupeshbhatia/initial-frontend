import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LoadInventoryJsonService } from '../../services/load-inventory-json/load-inventory-json.service'
import { PostInventoryDataService } from "../../services/post-inventory-data/post-inventory-data.service";
import { PostDDateDataService } from "../../services/post-date-data/post-date-data.service";
import { PostDeleteDataService } from "../../services/post-delete-data/post-delete-data.service";
import { Inventory } from "../../_models/inventory";
import { Query } from "../../_models/query";
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { environment } from '../../../config'


var Food: Inventory[] = []
const initialSelection = [];
const allowMultiSelect = true;

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})

export class ShowComponent implements OnInit {
  postInventoryData: PostInventoryDataService;
  postDateData: PostDDateDataService;
  postDeleteData: PostDeleteDataService
  food: Inventory;
  form: FormGroup;
  queryForm: FormGroup;
  private formSubmitAttempt: boolean;
  displayedColumns: string[] = ['select','name', 'origin' ,'location', 'date_arrived', 'expiry_date', 'sale_price', 'total_weight', 'modify']
  dataSource = new MatTableDataSource()
  today: number = Date.now()
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  @ViewChild("query") query: ElementRef
  @ViewChild("field") field: ElementRef
  @ViewChild("formDate") formDate : ElementRef

  selection = new SelectionModel<Inventory>(true, []);

  constructor(private formBuilder: FormBuilder, private http: Http, private loadInventoryJsonService: LoadInventoryJsonService) {
  }

  ngOnInit(): void{
    this.loadInventoryJsonService.getJSON()
      .subscribe(data => {
        console.log(data)

        console.log(data[0])
        this.dataSource.data = data
        Food = data
      })
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
    this.form = this.formBuilder.group({
      item_id: [null, [Validators.required, Validators.minLength(1)]],
      name: [null, [Validators.required, Validators.minLength(1)]],
      origin: [null, [Validators.required, Validators.minLength(1)]],
      date_arrived: [null, [Validators.required, Validators.minLength(1)]],
      total_weight: [null, [Validators.required, Validators.minLength(1)]],
      price: [null, [Validators.required, Validators.minLength(1)]],
      device_id: [null, [Validators.required, Validators.minLength(1)]],
      location: [null, [Validators.required, Validators.minLength(1)]]
    })
}

  getData() {
    this.loadInventoryJsonService.getJSON()
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

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim()
      .toLowerCase()
  }

  isFieldValid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSearch() {
    var query = this.query.nativeElement.value
    var field = this.field.nativeElement.value

    this.getSearchData(query, field)

    //post
  }

  getSearchData(query, field) {
    this.loadInventoryJsonService.getSearchJSON(query, field)
      .subscribe(data => {
        console.log(data)
        this.dataSource.data = data
        Food = data
      })
  }

  onSubmit() {
    this.formSubmitAttempt = true;
    if (this.form.valid) {
      console.log(this.form.value)
      this.loadInventoryJsonService.updateRow(this.form.value)
      .subscribe(console.log())
      alert('Your Inventory has been updated.');
      // $('#myModal').modal('hide');
    }
  }

  reset() {
    this.form.reset();
    this.formSubmitAttempt = false;
  }

get f() { return this.form.controls; }

  curField: any

 populateFields(e): Inventory {
   console.log(e)
   if (e != null) {
    this.curField = Food.find(function(){
      return e
    })
    console.log(this.curField)
    console.log(this.curField.date_arrived)
    this.formDate.nativeElement.value = this.curField.date_arrived
     console.log()
   }
   return e
}

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach((row: any) => this.selection.select(row));
  }

  removeSelectedRows() {
    this.selection.selected.forEach(item => {
      let index: number = Food.findIndex(d => d === item);
      console.log(index)
      console.log(item.item_id);

      console.log("++++++++++++++++++==")
      this.loadInventoryJsonService.deleteRow(item.item_id)
      .subscribe(console.log)

      this.dataSource.data.splice(index, 1);

      this.dataSource = new MatTableDataSource<Inventory>(Food);
    });
    this.selection = new SelectionModel<Inventory>(true, []);
  }
}
