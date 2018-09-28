
import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { AuthResponse } from "../../_models/auth-response"
import { FlashCellsEvent } from 'ag-grid-community'

@Component({
  selector: 'app-register-emp',
  templateUrl: './register-emp.component.html',
  styleUrls: ['./register-emp.component.css']
})
export class RegisterEmpComponent implements OnInit {

  registerForm: FormGroup
  formSubmitAttempt: boolean
  error: string
  userRoles: string[]
  data: AuthResponse
  returnUrl: string

  selectedOption: number
  roleStatus = ['Employee', 'Manager', 'Corporate']
  model: any = {}
  message: string
  showError = false


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient) {
    this.http = http
  }

  ngOnInit() {
    this.userRoles = ['employee', 'corporate', 'manager']
    this.registerForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required]],
      roleSelect: ['', [Validators.required]]
    })
    // this.role.controls['type'].setValue(this.default, {onlySelf: true})

    this.returnUrl = this.route.snapshot.queryParams[''] || '/'
  }



  // That "f" comes from here? Ye
  // show ne problems
  f(): any {
    console.log(this.registerForm.controls.email.errors)
    return this.registerForm.controls
  }

  // get reg() { return this.registerForm.controls }

  onSubmit() {
    this.formSubmitAttempt = true
    console.log("+++++++++++++++++++++++++")
    // this.registerForm.valid
    // if (this.registerForm.valid) {

    console.log('form submitted')
    // let resource = JSON.stringify(this.registerForm.value)

    console.log(this.registerForm.controls.lastname.value)

    const resource = `mutation{
      register(
        username:"${this.registerForm.controls.username.value}",
        password:"${this.registerForm.controls.password.value}",
        firstName:"${this.registerForm.controls.firstname.value}",
        lastName:"${this.registerForm.controls.lastname.value}",
        email:"${this.registerForm.controls.email.value}",
        role:"employee"
      )
      {
        access_token,
        refresh_token
      }
    }`



    console.log(resource)
    this.http.post('http://142.55.32.86:50281/api1', resource)
      .toPromise()
      // .then(d => this.data)
      .then((data: any) => {
        console.log(data)
        if (data.data.register !== null) {
          localStorage.setItem('access_token', data.data.register.access_token)
          localStorage.setItem('refresh_token', data.data.register.refresh_token)
          this.router.navigate([this.returnUrl])
          this.reset()
        }
        console.log("aaaaaaaaaaaaaaaaaaaa")
        console.log(data.data)
        if (data.errors[0].message === '2: Registeration Error') {
          this.showError = true
          this.message = 'User already exists'
        }
        else if (data.errors[0].message === '1: Registeration Error') {
          this.message = 'Server error'
        }
        }
      )



  }

  reset() {
    this.registerForm.reset()
    this.formSubmitAttempt = false
    this.model.roleStatus = ''
  }

}
