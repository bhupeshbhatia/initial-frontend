import { UserService } from './../../_services/user.service'
import { first } from 'rxjs/operators'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { AuthenticationService } from '../../_services'
import swal from 'sweetalert2'
import { PostInventoryDataService } from "../../services/post-inventory-data/post-inventory-data.service";


// declare interface User {
//   barcode?: string
//   productName?: string
//   email?: string //  must be valid email format
//   password?: string // required, value must be equal to confirm password.
//   confirmPassword?: string // required, value must be equal to password.
//   number?: number // required, value must be equal to password.
//   url?: string
//   idSource?: string
//   idDestination?: string
// }

// declare var $: any

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
  postInventoryData: PostInventoryDataService;
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
    private userService: UserService
    // private alertService: AlertService
    ) { }

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

    this.returnUrl = this.route.snapshot.queryParams['add-inv']
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls }



  onSubmit() {
    this.formSubmitAttempt = true
    if (this.form.valid) {
      console.log('form submitted')
      const resource = JSON.parse(this.form.value)
      this.postInventoryData.addInventoryWithPromise(resource,'test')

      // this.authenticationService.addInventory(resource)

      this.reset()
    }

      // this.service.create(resource)
    //   .subscribe(response => console.log(response))
    // }
  }

  reset() {
    this.form.reset()
    this.formSubmitAttempt = false
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