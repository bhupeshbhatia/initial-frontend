import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { InventoryModule } from '../../../../initial-frontend/src/app/inventory/inventory.module';

// declare interface User {
//   barcode?: string;
//   productName?: string;
//   email?: string; //  must be valid email format
//   password?: string; // required, value must be equal to confirm password.
//   confirmPassword?: string; // required, value must be equal to password.
//   number?: number; // required, value must be equal to password.
//   url?: string;
//   idSource?: string;
//   idDestination?: string;
// }

declare var $: any;

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

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  form: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(private formBuilder: FormBuilder, private _http: Http) { }



  ngOnInit() {
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


    if ($('.datetimepicker').length !== 0) {
      $('.datetimepicker').datetimepicker({
        icons: {
          time: 'fa fa-clock-o',
          date: 'fa fa-calendar',
          up: 'fa fa-chevron-up',
          down: 'fa fa-chevron-down',
          previous: 'fa fa-chevron-left',
          next: 'fa fa-chevron-right',
          today: 'fa fa-screenshot',
          clear: 'fa fa-trash',
          close: 'fa fa-remove'
        },
        debug: true
      });
    }

    if ($('.timepicker').length !== 0) {
      $('.timepicker').datetimepicker({
        //          format: 'H:mm',    // use this format if you want the 24hours timepicker
        format: 'h:mm A', // use this format if you want the 12hours timpiecker with AM/PM toggle
        icons: {
          time: 'fa fa-clock-o',
          date: 'fa fa-calendar',
          up: 'fa fa-chevron-up',
          down: 'fa fa-chevron-down',
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

  onSubmit(inventory: NgForm) {
    var json = JSON.stringify(inventory.value)
    console.log(json)
    // this.formSubmitAttempt = true;
    // if (this.form.valid) {
    //   console.log('form submitted');
    //   const resource = JSON.stringify(this.form.value);
    //   this._http.post('your_url', this.form).subscribe(status => console.log(JSON.stringify(status)));
    // console.log('Add Button clicked: ' + resource);
    // }

      // this.service.create(resource)
    //   .subscribe(response => console.log(response));
    // }
  }

  reset() {
    this.form.reset();
    this.formSubmitAttempt = false;
  }

}












// public typeValidation: User;

  // constructor() { }

  // ngOnInit() {
  //   this.typeValidation = {
  //     barcode: '',
  //     productName: '',
  //     email: '',
  //     idSource: '',
  //     idDestination: '',
  //     url: ''
  //   }

  // }

  // save(model: User, isValid: boolean) {
  //   // call API to save customer
  //   if (isValid) {
  //     console.log(model, isValid);
  //   }
  // }
  // save1(model: User, isValid: boolean) {
  //   // call API to save customer
  //   if (isValid) {
  //     console.log(model, isValid);
  //   }
  // }
  // save2(model: User, isValid: boolean) {
  //   // call API to save customer
  //   if (isValid) {
  //     console.log(model, isValid);
  //   }
  // }
  // onSubmit(value: any): void {
  //   console.log(value);
  // }



  // inventoryForm: FormGroup;
  // itemNumber: FormControl;
  // productName: FormControl;
  // origin: FormControl;
  // arrivalDate: FormControl;
  // weight: FormControl;
  // price: FormControl;
  // sensorId: FormControl;
  // location: FormControl;

  // model2: Date;




  // this.createFormControls();
    // this.createForm();

    // this.model2 = new Date();

  // createFormControls() {
  //   this.itemNumber = new FormControl(null, [
  //     Validators.required,
  //     Validators.minLength(1)
  //   ]);

  //   this.productName = new FormControl('', Validators.required);
  //   this.origin = new FormControl('', Validators.required);
  //   this.arrivalDate = new FormControl('', Validators.required);

  //   this.weight = new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(1)
  //   ]);

  //   this.price = new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(1)
  //   ]);

  //   this.sensorId = new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(1)
  //   ]);

  //   this.location = new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(3)
  //   ]);
  // }

  // createForm() {
  //   this.inventoryForm = new FormGroup({
  //     inventory: new FormGroup({
  //       itemNumber: this.itemNumber,
  //       productName: this.productName,
  //       origin: this.origin,
  //       arrivalDate: this.arrivalDate,
  //       weight: this.weight,
  //       price: this.price,
  //       sensorId: this.sensorId,
  //       location: this.location,
  //     }),
  //   });
  // }
