import { Component, Input, EventEmitter } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'


@Component({
  selector: 'dialog-data-dialog',
  templateUrl: 'dialog-data-dialog.html',
})
export class DialogDataDialog {

  @Input() event: Event;


  form: FormGroup
  private formSubmitAttempt: boolean
  curField: any
  constructor(private formBuilder: FormBuilder) {

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


  get f() { return this.form.controls }

  onSubmit() {
    const month = new Array()
    month[0] = "January"
    month[1] = "February"
    month[2] = "March"
    month[3] = "April"
    month[4] = "May"
    month[5] = "June"
    month[6] = "July"
    month[7] = "August"
    month[8] = "September"
    month[9] = "October"
    month[10] = "November"
    month[11] = "December"
    this.formSubmitAttempt = true
    const origDate = this.form.value.date_arrived
    this.form.value.date_arrived = Math.floor(Date.parse(`${origDate.year}/${month[origDate.month]}/${origDate.day}`) / 1000)
    console.log("submitted");
    // this.loadInventoryJsonService.updateRow(this.form.value)
    // alert('Your Inventory has been updated.')
    // $('#myModal').modal('hide')

  }
}