import { UserService } from './../../_services/user.service'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { AuthenticationService } from '../../_services'
import swal from 'sweetalert2'
import { LoadInventoryJsonService } from "../../services/load-inventory-json/load-inventory-json.service"

export interface Inventory {
  item_id: number
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
  form: FormGroup
  formSubmitAttempt: boolean
  error: string
  returnUrl: string
  loading = false

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private loadJsonData: LoadInventoryJsonService
    ) { }

  ngOnInit() {
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

    this.returnUrl = this.route.snapshot.queryParams['add-inv']
  }

  // convenience getter for easy access to form fields
f() { return this.form.controls }


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
      this.loadJsonData.addProd(this.form.value)
    //  this.reset()
  }

  reset() {
    this.form.reset()
    //this.formSubmitAttempt = false
  }

  showMessage(type: string) {
    if (type === 'success-message') {
      swal({
          title: 'Success',
          text: 'Product added',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-success',
          type: 'success'
      }).catch(swal.noop)

  }
  }

}