import { HttpModule } from '@angular/http';
import { Component, OnInit, ElementRef } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { first, timeInterval } from 'rxjs/operators'

import { AuthenticationService } from '../../_services'
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  moduleId: module.id,
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

  http = null

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private http: HttpClient
  ) {
    this.http = http
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, [Validators.required, Validators.minLength(5)]]
    })

    // reset login status
    this.authenticationService.logout()

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams[''] || '/'
  }

  get f() {
    return this.loginForm.controls
  }


  onSubmit() {
    this.formSubmitAttempt = true
    // this.submitted = true

    if (this.loginForm.valid) {
      console.log('form submitted')
      let resource = JSON.stringify(this.loginForm.value)

      // const username = this.loginForm.get('username').value
      // const password = this.loginForm.get('password').value

      console.log(resource)
      resource = `{
        login(username:"${this.f.username.value}",password:"${this.f.password.value}")
        {
          access_token,
          refresh_token
        }
      }`

      this.loading = true
      console.log(this.http)
      this.http.post('142.55.32.86/api', resource)
      .toPromise()
      .then(d => d.data)
      .then(data => {
        console.log(data.login)
        if (data.login.access_token == null) {
          $("#response").text("Invalid Credentials")
        }
        else {
          localStorage.setItem("access_token", data.login.access_token)
          localStorage.setItem("refresh_token", data.login.refresh_token)
          this.router.navigate([this.returnUrl])
          this.reset()
        }
      })
        // .pipe(first())
        // .subscribe(
        //   data => {
        //   },
        //   error => {
        //     // this.alertService.error(error)
        //     this.loading = false
        //   })
    }


    // this.service.create(resource)
    //   .subscribe(response => console.log(response))
    // }
  }

  reset() {
    this.loginForm.reset()
    this.formSubmitAttempt = false
  }
}
