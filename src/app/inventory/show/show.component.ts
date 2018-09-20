import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { DataTableComponent } from '../../tables/datatable.net/datatable.component';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { LoadInventoryJsonService } from '../../Services/load-inventory-json/load-inventory-json.service'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { PostInventoryDataService } from "../../services/post-inventory-data/post-inventory-data.service";
import { PostDDateDataService } from "../../services/post-date-data/post-date-data.service";
import { PostDeleteDataService } from "../../services/post-delete-data/post-delete-data.service";

declare var require: any
declare var $:any;

export class Inventory {
  item_number: number
  item_name: string
  status: string
  product_origin: string
  arrival_date: Date
  expiry_date: Date
  total_weight: number
  price: number
  monitored_by: string
  location: string
}

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: Inventory[];
}

var Food: Inventory[]


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
  dataTable: DataTable;
  @ViewChild("datatable") datatable: DataTable;

  constructor(private formBuilder: FormBuilder, private _http: Http, private loadInventoryJsonService: LoadInventoryJsonService) {
  }

  ngOnInit(): void{
		this.loadInventoryJsonService.getJSON()
		  .subscribe(data => {
			console.log(data)
        this.dataTable = {
          headerRow: ['Item Number', 'Item Name', 'Location', 'Status', 'Expiry'],
          footerRow: ['Item Number', 'Item Name', 'Location', 'Status', 'Expiry'],
          dataRows: data
        }
        Food = data
      })

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

get f() { return this.form.controls; }

ngAfterViewInit() {
  $('#datatable').DataTable({
    "pagingType": "full_numbers",
    "lengthMenu": [
      [10, 25, 50, 100],
      [10, 25, 50, 100]
    ],
    responsive: true,
    "scrollY": "500px",
    "scrollX": "true",
    "paging": "false",
    language: {
      search: "_INPUT_",
      searchPlaceholder: "Search records",
    }
  });

  var table = $('#datatable').DataTable();

  //Delete a record
  table.on('click', '.remove', function (e) {
    var tr = $("tr.selected");
    var data = table.row(tr).data();
    var r = confirm("Delete the selected rows");
    if (r == true) {
      table.rows(tr).remove().draw();
      alert("Row(s) deleted");
    } else {
      alert("Row(s) Not Deleted");
    }
    e.preventDefault();
  });
}

  curItemNum: any
  addDeleteWithPromise(e){
    if(e != null){
      this.curItemNum = Food[e].item_number
      this.addDeleteWithPromise("/delete-product");
      console.log()
    }
    return e
  }

  curField: any

 populateFields(e): Inventory {
   if (e != null) {
    this.curField = Food[e]
     console.log()
   }
   return e
}

  checked: number = 0;
checkValue(event: any){
  var editBtn = $('a[id="editBtn"]');
  // console.log(event.target.checked);
  if(event.target.checked){
    this.checked++;
  }
  else if (!event.target.checked) {
    this.checked--;
  }
  if (this.checked >= 2) {
    editBtn.attr("disabled", true);
  }
  if (this.checked <= 1) {
    editBtn.attr("disabled", false);
  }
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

onSearch(search: NgForm){
      var json = search.value.dp
      console.log($('datepicker').value)
      var date = new Date(json.year, json.month-1, json.day);
      var jsonStr = date.toISOString();
      console.log(jsonStr);
      this.postDateData.addDateWithPromise(jsonStr,'/get-product-range')
}

onSubmit(inventory: NgForm): void {
  this.formSubmitAttempt = true;
    if (this.form.valid) {
      var json = JSON.parse(inventory.value)
      console.log(json)
      this.postInventoryData.addInventoryWithPromise(json,'/update-product')
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

}
