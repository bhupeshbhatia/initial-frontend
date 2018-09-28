import { Component, OnInit, ElementRef } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { PasswordValidation } from '../../forms/validationforms/password-validator.component'

declare interface User {
    text?: string
    email?: string //  must be valid email format
    password?: string // required, value must be equal to confirm password.
    confirmPassword?: string // required, value must be equal to password.
    number?: number // required, value must be equal to password.
    url?: string
    idSource?: string
    idDestination?: string
}

declare var $: any;

@Component({
    selector: 'register-cmp',
    templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit {
    focus
    focus1
    focus2
    test: Date = new Date()
    private toggleButton
    private sidebarVisible: boolean
    private nativeElement: Node
    public typeValidation: User

    constructor(private element: ElementRef) {
        this.nativeElement = element.nativeElement
        this.sidebarVisible = false
    }
    checkFullPageBackgroundImage() {
        var $page = $('.full-page')
        var image_src = $page.data('image')

        if (image_src !== undefined) {
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container)
        }
    }

    ngOnInit() {

    this.typeValidation = {
            text: '',
            password: '',
            confirmPassword: '',
            email: '',
            idSource: '',
            idDestination: '',
            url: ''
        }

        this.checkFullPageBackgroundImage()
        var body = document.getElementsByTagName('body')[0]
        body.classList.add('register-page')
        var navbar: HTMLElement = this.element.nativeElement
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0]

        setTimeout(function () {
            // after 1000 ms we add the class animated to the Register/register card
            $('.card').removeClass('card-hidden')
        }, 700)
    }

    save2(model: User, isValid: boolean) {
    // call API to save customer
        if(isValid){
            console.log(model, isValid)
        }
    }
    ngOnDestroy() {
        var body = document.getElementsByTagName('body')[0]
        body.classList.remove('register-page')
    }
    // sidebarToggle() {
    //     var toggleButton = this.toggleButton
    //     var body = document.getElementsByTagName('body')[0]
    //     var sidebar = document.getElementsByClassName('navbar-collapse')[0]
    //     if (this.sidebarVisible == false) {
    //         setTimeout(function () {
    //             toggleButton.classList.add('toggled')
    //         }, 500)
    //         body.classList.add('nav-open')
    //         this.sidebarVisible = true
    //     } else {
    //         this.toggleButton.classList.remove('toggled')
    //         this.sidebarVisible = false
    //         body.classList.remove('nav-open')
    //     }
    // }
}
