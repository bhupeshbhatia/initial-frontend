import { HttpModule } from '@angular/http'
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { first, timeInterval } from 'rxjs/operators'

import { AuthenticationService } from '../../_services'
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { AuthResponse } from "../../_models/auth-response"
import { controlNameBinding } from '@angular/forms/src/directives/reactive_directives/form_control_name'

@Component({

  selector: 'login-cmp',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup
  loading = false
  returnUrl: string
  error = ''
  formSubmitAttempt: boolean
  @ViewChild('response') response: Element
  showError = false

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: HttpClient
  ) {
    this.http = http
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })

    // reset login status
    this.authenticationService.logout()

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams[''] || '/'
  }

  f() {
    return this.loginForm.controls
  }


  onSubmit(): void {
    this.formSubmitAttempt = true
    // this.submitted = true

    if (this.loginForm.valid) {
      console.log('form submitted')
      let resource = JSON.stringify(this.loginForm.value)

      // const username = this.loginForm.get('username').value
      // const password = this.loginForm.get('password').value

      console.log(resource)
      resource = `{
        login(username:"${this.loginForm.controls.username.value}",password:"${this.loginForm.controls.value}")
        {
          access_token,
          refresh_token
        }
      }`

      this.loading = true
      console.log(this.http)
      this.http.post('http://142.55.32.86:50281/api1', resource)
      .toPromise()
      // .then(d => this.data)
      .then((data: any) => {
        console.log(data.data.login)
        if (data.data.login !== null) {
          localStorage.setItem('access_token', data.data.login.access_token)
          localStorage.setItem('refresh_token', data.data.login.refresh_token)
          this.router.navigate([this.returnUrl])
          this.showError = false
          this.reset()
        }
        // if (data.data.login.access_token == null) {
        //   this.validateAllFormFields(this.loginForm) //{7}
        // }
        else {
          this.showError = true
        }
      })
    }
  }

  reset(): void {
    this.loginForm.reset()
    this.formSubmitAttempt = false
  }
}
