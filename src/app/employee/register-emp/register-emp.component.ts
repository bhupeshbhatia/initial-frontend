import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-emp',
  templateUrl: './register-emp.component.html',
  styleUrls: ['./register-emp.component.css']
})
export class RegisterEmpComponent implements OnInit {

  registerForm: FormGroup;
  formSubmitAttempt: boolean;
  error: string

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      password: [null, [Validators.required, Validators.minLength(5)]]
    })
  }

  get reg() { return this.registerForm.controls; }

  onSubmit() {
    this.formSubmitAttempt = true;
    if (this.registerForm.valid) {
      console.log('form submitted');
      const resource = JSON.stringify(this.registerForm.value);

      console.log(resource);
    }

      // this.service.create(resource)
    //   .subscribe(response => console.log(response));
    // }
  }

  reset() {
    this.registerForm.reset();
    this.formSubmitAttempt = false;
  }

}
