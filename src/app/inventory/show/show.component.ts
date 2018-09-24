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
import { SelectionModel } from '@angular/cdk/collections';

const Food: Inventory[] = []
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
  private formSubmitAttempt: boolean;
  displayedColumns: string[] = ['item_id', 'select','name', 'location', 'status', 'expiry', 'modify']
  dataSource = new MatTableDataSource()
  today: number = Date.now()
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  selection = new SelectionModel<Inventory>(true, []);

  constructor(private formBuilder: FormBuilder, private _http: Http, private loadInventoryJsonService: LoadInventoryJsonService) {
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

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

  onSearch(search: NgForm) {
    var json = search.value.dp
    console.log($('datepicker').value)
    var date = new Date(json.year, json.month - 1, json.day);
    var jsonStr = date.toISOString();
    console.log(jsonStr);
    this.postDateData.addDateWithPromise(jsonStr, '/get-product-range')
  }

  onSubmit(inventory: NgForm): void {
    this.formSubmitAttempt = true;
    if (this.form.valid) {
      var json = JSON.parse(inventory.value)
      console.log(json)
      this.postInventoryData.addInventoryWithPromise(json, '/update-product')
      alert('Your Inventory has been updated.');
      // const resource = JSON.stringify(this.form.value);
      // this._http.post('/inventory/show-inv', json).subscribe(status => console.log(JSON.stringify(status)));
      console.log('Add Button clicked: ' + json);
      $('#myModal').modal('hide');
    }
  }

  reset() {
    this.form.reset();
    this.formSubmitAttempt = false;
  }

get f() { return this.form.controls; }

  curField: any

 populateFields(e): Inventory {
   if (e != null) {
    this.curField = Food[e- 1]
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
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  removeSelectedRows() {
    this.selection.selected.forEach(item => {
      let index: number = Food.findIndex(d => d === item);
      console.log(Food.findIndex(d => d === item));
      console.log(item.item_id);
      this.postDeleteData.addDeleteWithPromise(item.item_id, "")
      this.dataSource.data.splice(index, 1);

      this.dataSource = new MatTableDataSource<Inventory>(Food);
    });
    this.selection = new SelectionModel<Inventory>(true, []);
  }
}
