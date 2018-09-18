import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldErrorDisplayComponent } from '../field-error-display/field-error-display.component'

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

// declare var $: any;





@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  form: FormGroup;
  formSubmitAttempt: boolean;
  error: string;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      itemNumber: [null, [Validators.required, Validators.minLength(1)]],
      productName: [null, [Validators.required, Validators.minLength(1)]],
      origin: [null, [Validators.required, Validators.minLength(1)]],
      arrivalDate: [null, [Validators.required, Validators.minLength(1)]],
      weight: [null, [Validators.required, Validators.minLength(1)]],
      price: [null, [Validators.required, Validators.minLength(1)]],
      deviceId: [null, [Validators.required, Validators.minLength(1)]],
      location: [null, [Validators.required, Validators.minLength(1)]]
    })


    // if ($('.datetimepicker').length !== 0) {
    //   $('.datetimepicker').datetimepicker({
    //     icons: {
    //       time: 'fa fa-clock-o',
    //       date: 'fa fa-calendar',
    //       up: 'fa fa-chevron-up',
    //       down: 'fa fa-chevron-down',
    //       previous: 'fa fa-chevron-left',
    //       next: 'fa fa-chevron-right',
    //       today: 'fa fa-screenshot',
    //       clear: 'fa fa-trash',
    //       close: 'fa fa-remove'
    //     },
    //     debug: true
    //   });
    // }

    // if ($('.timepicker').length !== 0) {
    //   $('.timepicker').datetimepicker({
    //     //          format: 'H:mm',    // use this format if you want the 24hours timepicker
    //     format: 'h:mm A', // use this format if you want the 12hours timpiecker with AM/PM toggle
    //     icons: {
    //       time: 'fa fa-clock-o',
    //       date: 'fa fa-calendar',
    //       up: 'fa fa-chevron-up',
    //       down: 'fa fa-chevron-down',
    //       previous: 'fa fa-chevron-left',
    //       next: 'fa fa-chevron-right',
    //       today: 'fa fa-screenshot',
    //       clear: 'fa fa-trash',
    //       close: 'fa fa-remove'
    //     },
    //     debug: true
    //   });
    // }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.formSubmitAttempt = true;
    if (this.form.valid) {
      console.log('form submitted');
      const resource = JSON.stringify(this.form.value);

      console.log(resource);
    }

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
