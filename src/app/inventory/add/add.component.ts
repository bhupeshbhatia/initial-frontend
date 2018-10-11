import { AddInventoryService } from './add.service';
import { Component, OnInit, Inject } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import swal from "sweetalert";
import MockUtils from './mockutils'

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [AddInventoryService]
})
export class AddComponent implements OnInit {
  form: FormGroup
  formSubmitAttempt: boolean

  constructor(
    private formBuilder: FormBuilder,
    private addService: AddInventoryService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      upc: ['', [Validators.required, Validators.minLength(1)]],
      sku: ['', [Validators.required, Validators.minLength(1)]],
      item_id: ['', [Validators.required, Validators.minLength(1)]],
      name: ['', [Validators.required, Validators.minLength(1)]],
      origin: ['', [Validators.required, Validators.minLength(1)]],
      date_arrived: ['', [Validators.required, Validators.minLength(1)]],
      total_weight: ['', [Validators.required, Validators.minLength(1)]],
      price: ['', [Validators.required, Validators.minLength(1)]],
      device_id: ['', [Validators.required, Validators.minLength(1)]],
      lot: ['', [Validators.required, Validators.minLength(1)]]
    })
  }

  generate() {
    const m = new MockUtils()

    this.form.get('sku')
      .setValue(m.genSKU())
    this.form.get('upc')
      .setValue(m.genBarcode());
    this.form.get('item_id')
      .setValue(m.genUUID());
    this.form.get('name')
      .setValue(m.genName());
    this.form.get('origin')
      .setValue(m.genOrigin());
    this.form.get('date_arrived')
      .setValue(new Date(m.genDateArrived()).toUTCString());
    this.form.get('total_weight')
      .setValue(m.genWeight().toFixed(2) + ' Kilograms');
    this.form.get('price')
      .setValue(m.genPrice().toFixed(2) + ' Dollars');
    this.form.get('device_id')
      .setValue(m.genUUID());
    this.form.get('lot')
      .setValue(m.genLot());
  }

  onSubmit() {
    this.formSubmitAttempt = true
    if (this.form.valid) {
      this.addService.addItem(this.form.value)
      .subscribe(data => {
        console.log("------------------")
        swal("Record successfully inserted!");
        this.reset()
        this.formSubmitAttempt = false
      })
    }
  }

  reset() {
    this.form.reset()
    this.formSubmitAttempt = false
  }

  isFieldValid(field: string) {
    return this.formSubmitAttempt && this.form.controls[field].status == 'INVALID'
  }

}
