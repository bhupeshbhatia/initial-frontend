import { TokenExtraction } from '../_helpers'
import { Component, OnInit, AfterViewInit, AfterViewChecked, AfterContentInit, Testability } from '@angular/core'

// Metadata
export interface RouteInfo {
    path: string
    title: string
    type: string
    icontype: string
    // icon: string
    children?: ChildrenItems[]
}

export interface ChildrenItems {
    path: string
    title: string
    ab: string
    type?: string
}

// Menu Items
export const ROUTES: RouteInfo[] = [{
        path: '/dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'nc-icon nc-bank'
    }, {
        path: '/inventory',
        title: 'Inventory',
        type: 'sub',
        icontype: 'nc-icon nc-box-2',
        children: [
            {path: 'show-inv', title: 'Show Inventory', ab: 'SH'},
            {path: 'add-inv', title: 'Add Inventory', ab: 'AD'},
        ]
    }, {
        path: '/monitoring',
        title: 'Monitor',
        type: 'sub',
        icontype: 'nc-icon nc-tv-2',
        children: [
            // {path: 'ethylene', title: 'Ethylene', ab: 'ET'},
            {path: 'carbon', title: 'Carbon Dioxide', ab: 'CO'}
            // {path: 'saved', title: 'Amount Saved', ab: 'AS'},
            // {path: 'waste', title: 'Waste', ab: 'WA'}
        ]
    }, {
        path: '/history',
        title: 'History',
        type: 'sub',
        icontype: 'nc-icon nc-world-2',
    }, {
        path: '/flash-sale',
        title: 'Flash Sale',
        type: 'sub',
        icontype: 'nc-icon nc-user-run',
    }, {
        path: '/employee',
        title: 'Employee',
        type: 'sub',
        icontype: 'nc-icon nc-user-run',
        children: [
            {path: 'register', title: 'Register', ab: 'ET'}
        ]
    },
    // {
    //     path: '/components',
    //     title: 'Components',
    //     type: 'sub',
    //     icontype: 'nc-icon nc-layout-11',
    //     children: [
    //         {path: 'buttons', title: 'Buttons', ab: 'B'},
    //         {path: 'grid', title: 'Grid System', ab: 'GS'},
    //         {path: 'panels', title: 'Panels', ab: 'P'},
    //         {path: 'sweet-alert', title: 'Sweet Alert', ab: 'SA'},
    //         {path: 'notifications', title: 'Notifications', ab: 'N'},
    //         {path: 'icons', title: 'Icons', ab: 'I'},
    //         {path: 'typography', title: 'Typography', ab: 'T'}
    //     ]
    // }
    // ,
    // {
    //     path: '/forms',
    //     title: 'Forms',
    //     type: 'sub',
    //     icontype: 'nc-icon nc-ruler-pencil',
    //     children: [
    //         {path: 'regular', title: 'Regular Forms', ab: 'RF'},
    //         {path: 'extended', title: 'Extended Forms', ab: 'EF'},
    //         {path: 'validation', title: 'Validation Forms', ab: 'VF'},
    //         {path: 'wizard', title: 'Wizard', ab: 'W'}
    //     ]
    // }, {
    //     path: '/tables',
    //     title: 'Tables',
    //     type: 'sub',
    //     icontype: 'nc-icon nc-single-copy-04',
    //     children: [
    //         {path: 'regular', title: 'Regular Tables', ab: 'RT'},
    //         {path: 'extended', title: 'Extended Tables', ab: 'ET'},
    //         {path: 'datatables.net', title: 'Datatables.net', ab: 'DT'}
    //     ]
    // },
    // {
    //     path: '/maps',
    //     title: 'Maps',
    //     type: 'sub',
    //     icontype: 'nc-icon nc-pin-3',
    //     children: [
    //         {path: 'google', title: 'Google Maps', ab: 'GM'},
    //         {path: 'fullscreen', title: 'Full Screen Map', ab: 'FSM'},
    //         {path: 'vector', title: 'Vector Map', ab: 'VM'}
    //     ]
    // }, {
    //     path: '/widgets',
    //     title: 'Widgets',
    //     type: 'link',
    //     icontype: 'nc-icon nc-box'

    // }, {
    //     path: '/charts',
    //     title: 'Charts',
    //     type: 'link',
    //     icontype: 'nc-icon nc-chart-bar-32'

    // },
    //  {
    //     path: '/calendar',
    //     title: 'Calendar',
    //     type: 'link',
    //     icontype: 'nc-icon nc-calendar-60'
    // },
     {
        path: '/pages',
        title: 'Pages',
        type: 'sub',
        icontype: 'nc-icon nc-book-bookmark',
        children: [
            {path: 'timeline', title: 'Timeline Page', ab: 'T'},
            {path: 'user', title: 'User Page', ab: 'UP'},
            {path: 'login', title: 'Login Page', ab: 'LP'},
            {path: 'register', title: 'Register Page', ab: 'RP'},
            {path: 'lock', title: 'Lock Screen Page', ab: 'LSP'}
        ]
    }
]

@Component({
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit{

    role: string
    global: any
    name: string

    constructor(global: TokenExtraction) {
        console.log(global, '+++++++++++++++')
        this.global = global
        this.role = this.upperFirstLetter(this.global.getUserInfo().role)
        this.name = `${this.upperFirstLetter(this.global.getUserInfo().first_name)}
        ${this.upperFirstLetter(this.global.getUserInfo().last_name)}`
        console.log(this.global.getUserInfo().role)
        console.log(this.global.getUserInfo())
    }

    upperFirstLetter(word: string): string {
        return word[0].toUpperCase() + word.slice(1)
    }


    public menuItems: any[]
    isNotMobileMenu() {
        if ( window.outerWidth > 991) {
            return false
        }
        return true
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem)
        // this.userRole = 'Corporate'
    }
    ngAfterViewInit() {
    }
}
