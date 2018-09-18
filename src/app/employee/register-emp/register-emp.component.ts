import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-emp',
  templateUrl: './register-emp.component.html',
  styleUrls: ['./register-emp.component.css']
})
export class RegisterEmpComponent implements OnInit {

  registerForm: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, [Validators.required, Validators.minLength(8)]]
    })
  }

  isFieldValid(field: string) {
    return (
      (!this.registerForm.get(field).valid && this.registerForm.get(field).touched) ||
      (this.registerForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }

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