import { RouterModule } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'

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

  constructor(private formBuilder: FormBuilder) { }

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



  get reg() { return this.registerForm.controls }

  onSubmit() {
    this.formSubmitAttempt = true
    if (this.registerForm.valid) {
      console.log('form submitted')
      const resource = JSON.stringify(this.registerForm.value)

      console.log(resource)
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
