import { RouterModule } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-emp',
  templateUrl: './register-emp.component.html',
  styleUrls: ['./register-emp.component.css']
})
export class RegisterEmpComponent implements OnInit {

  registerForm: FormGroup
  formSubmitAttempt: boolean
  error: string
  userRoles: []


  http = null

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
      firstname: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      lastname: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      username: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: [null, [Validators.required, Validators.minLength(5)]]
      // role: [null, [Validators.required]]
    })
    // this.role.controls['type'].setValue(this.default, {onlySelf: true})
  }


  get f() {
    return this.registerForm.controls
  }

  get reg() { return this.registerForm.controls }

  onSubmit() {
    this.formSubmitAttempt = true
    if (this.registerForm.valid) {
      console.log('form submitted')
      let resource = JSON.stringify(this.registerForm.value)

      resource = `{
        mutation{register(username:"${this.f.username.value}",password:"${this.f.password.value}",firstName:"${this.f.firstname.value}",
        lastName:"${this.f.lastName.value}",email:"${this.f.email.value}",role:"${this.f.role.value}")
        )
        {
          access_token,
          refresh_token
        }
      }`






      console.log(resource)
      this.http.post('142.55.32.86/api', resource)
        .toPromise()
        .then(d => d.data)
        .then(data => {
          console.log(data.register)
        })
    }

      // this.service.create(resource)
    //   .subscribe(response => console.log(response))
    // }
  }

  reset() {
    this.registerForm.reset()
    this.formSubmitAttempt = false
  }

}
