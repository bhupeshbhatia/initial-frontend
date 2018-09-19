import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule, Form } from '@angular/forms';
import { DataTableComponent } from '../../tables/datatable.net/datatable.component';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { LoadInventoryJsonService } from '../../Services/load-inventory-json/load-inventory-json.service'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

declare var require: any
declare var $:any;

export interface Inventory {
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

const FoodInventory: Inventory[] = [
  {
    "item_number": 1,
    "item_name": "apple",
    "status": "good",
    "product_origin": "farm",
    "arrival_date": new Date("2018-03-03"),
    "expiry_date": new Date("2018-03-03"),
    "total_weight": 22,
    "price": 44,
    "monitored_by": "Person1",
    "location": "Mississauga"
  },
  {
    "item_number": 2,
    "item_name": "pear",
    "status": "good",
    "product_origin": "farm",
    "arrival_date": new Date("2018-03-03"),
    "expiry_date": new Date("2018-03-03"),
    "total_weight": 22,
    "price": 44,
    "monitored_by": "Person1",
    "location": "Mississauga"
  },
  {
    "item_number": 3,
    "item_name": "orange",
    "status": "good",
    "product_origin": "farm",
    "arrival_date": new Date("2018-03-03"),
    "expiry_date": new Date("2018-03-03"),
    "total_weight": 22,
    "price": 44,
    "monitored_by": "Person1",
    "location": "Mississauga"
  },
  {
    "item_number": 4,
    "item_name": "grape",
    "status": "good",
    "product_origin": "farm",
    "arrival_date": new Date("2018-03-03"),
    "expiry_date": new Date("2018-03-03"),
    "total_weight": 22,
    "price": 44,
    "monitored_by": "Person1",
    "location": "Mississauga"
  },
  {
    "item_number": 5,
    "item_name": "avocado",
    "status": "good",
    "product_origin": "farm",
    "arrival_date": new Date("2018-03-03"),
    "expiry_date": new Date("2018-03-03"),
    "total_weight": 22,
    "price": 44,
    "monitored_by": "Person1",
    "location": "Mississauga"
  },
  {
    "item_number": 6,
    "item_name": "eggplant",
    "status": "good",
    "product_origin": "farm",
    "arrival_date": new Date("2018-03-03"),
    "expiry_date": new Date("2018-03-03"),
    "total_weight": 22,
    "price": 44,
    "monitored_by": "Person1",
    "location": "Mississauga"
  },
  {
    "item_number": 7,
    "item_name": "mango",
    "status": "good",
    "product_origin": "farm",
    "arrival_date": new Date("2018-03-03"),
    "expiry_date": new Date("2018-03-03"),
    "total_weight": 22,
    "price": 44,
    "monitored_by": "Person1",
    "location": "Mississauga"
  }
]

@Component({
  // moduleId: module.id,
    // selector: 'data-table-cmp',
    // templateUrl: 'datatable.component.html'
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})

export class ShowComponent implements OnInit {

tdata: any;
form: FormGroup;
private formSubmitAttempt: boolean;

  constructor(private formBuilder: FormBuilder, private _http: Http) { }
@ViewChild("datatable") datatable: DataTable;
@ViewChild("itemName") input: Input;

  public dataTable: DataTable;
  public itemName: Input

  state_default: boolean = true;
  state_plain: boolean = true;
  state_with_icons: boolean = true;
  tagItems = ['Amsterdam', 'Washington', 'Sydney', 'Beijing'];
  model: Date;
  model2: Date;
  ngOnInit(): void{

  this.dataTable = {
    headerRow: ['Item Number', 'Item Name', 'Location', 'Status', 'Expiry'],
    footerRow: ['Item Number', 'Item Name', 'Location', 'Status', 'Expiry'],
    dataRows: FoodInventory
  }

  this.form = this.formBuilder.group({
    itemNumber: [null, [Validators.required, Validators.minLength(1)]],
    productName: [null, Validators.required],
    origin: [null, Validators.required],
    arrivalDate: [null, Validators.required],
    weight: [null, [Validators.required, Validators.minLength(1)]],
    price: [null, [Validators.required, Validators.minLength(1)]],
    sensorId: [null, [Validators.required, Validators.minLength(1)]],
    location: [null, [Validators.required, Validators.minLength(1)]]
  })

    this.model = new Date();
    this.model2 = new Date();
    //  Activate the tooltips
    $('[rel="tooltip"]').tooltip();

        //  Init Bootstrap Select Picker
    if ($(".selectpicker").length != 0) {
      $(".selectpicker").selectpicker({
        iconBase: "nc-icon",
        tickIcon: "nc-check-2"
      });
    }

    if ($(".datetimepicker").length != 0) {
      $('.datetimepicker').datetimepicker({
        icons: {
          time: "fa fa-clock-o",
          date: "fa fa-calendar",
          up: "fa fa-chevron-up",
          down: "fa fa-chevron-down",
          previous: 'fa fa-chevron-left',
          next: 'fa fa-chevron-right',
          today: 'fa fa-screenshot',
          clear: 'fa fa-trash',
          close: 'fa fa-remove'
        },
        debug: true
      });
    }

    if ($(".datepicker").length != 0) {
      $('.datepicker').datetimepicker({
        format: 'M/D/YYYY',
        icons: {
          time: "fa fa-clock-o",
          date: "fa fa-calendar",
          up: "fa fa-chevron-up",
          down: "fa fa-chevron-down",
          previous: 'fa fa-chevron-left',
          next: 'fa fa-chevron-right',
          today: 'fa fa-screenshot',
          clear: 'fa fa-trash',
          close: 'fa fa-remove'
        },
        debug: true
      });
    }

    if ($(".timepicker").length != 0) {
      $('.timepicker').datetimepicker({
        //          format: 'H:mm',    // use this format if you want the 24hours timepicker
        format: 'h:mm A', //use this format if you want the 12hours timpiecker with AM/PM toggle
        icons: {
          time: "fa fa-clock-o",
          date: "fa fa-calendar",
          up: "fa fa-chevron-up",
          down: "fa fa-chevron-down",
          previous: 'fa fa-chevron-left',
          next: 'fa fa-chevron-right',
          today: 'fa fa-screenshot',
          clear: 'fa fa-trash',
          close: 'fa fa-remove'
        },
        debug: true
      });
    }
}

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
  var itemNumber = $('#itemNumber');
  var itemName = $('#itemName');
  var productOrigin = $('#productOrigin');
  var arrivalDate = $('#arrivalDate');
  var totalWeight = $('#totalWeight');
  var price = $('#price');
  var monitoredBy = $('#monitoredBy');
  var location = $('#location')

  // Edit record
  table.on('click', '.edit', function() {
    let $tr = $(this).closest('tr');
    var data = table.row($tr).data();
    // alert('You press on Row: ' + data[0] + ' ' + data[2] + ' ' + data[3] + '\'s row.');
    itemNumber.val(FoodInventory[data[0] - 1].item_number);
    itemName.val(FoodInventory[data[0] - 1].item_name);
    productOrigin.val(FoodInventory[data[0] - 1].product_origin);
    arrivalDate.val(FoodInventory[data[0] - 1].arrival_date.toLocaleDateString());
    totalWeight.val(FoodInventory[data[0] - 1].total_weight);
    price.val(FoodInventory[data[0] - 1].price);
    monitoredBy.val(FoodInventory[data[0] - 1].monitored_by);
    location.val(FoodInventory[data[0] - 1].location);
  });

  // Delete a record
  table.on('click', '.remove', function (e) {
    var tr = $("tr.selected");
    var r = confirm("Delete the selected rows");
    if (r == true) {
      table.rows(tr).remove().draw();
      alert("Rows deleted");
    } else {
      alert("Rows Not Deleted");
    }
    e.preventDefault();
  });

  // Like record
  table.on('click', '.not-selected', function () {
    var tr = $(this).closest('tr');
    console.log(tr);
    tr.addClass("selected")
  });
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

onSubmit() {
  this.formSubmitAttempt = true;
  if (this.form.valid) {
    console.log('form submitted');
    const resource = JSON.stringify(this.form.value);
    this._http.post('your_url', this.form).subscribe(status => console.log(JSON.stringify(status)));
    console.log('Add Button clicked: ' + resource);
    $('#myModal').modal('hide');
  }
}

reset() {
  this.form.reset();
  this.formSubmitAttempt = false;
}

}



