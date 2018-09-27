import { Injectable } from '@angular/core'
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http'
import { Observable, of, throwError } from 'rxjs'
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators'

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const testUser = {
            id: 1,
            username: 'test',
            password: 'testing',
            firstName: 'Test',
            lastName: 'User'
        }

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {
            // authenticate
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                if (request.body.username === testUser.username && request.body.password === testUser.password) {
                    // if login details are valid return 200 OK with a fake jwt token
                    // const body = {
                    //     access_token: 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzczMzU3ODksImlhdCI6MTUzNzMzNDg4OSwianRpIjoiMzQxMDc5ZTEtOTc0OC00NWJkLWJlMmYtZjdkYmY4ZDNiMDFjIiwicm9sZSI6Im1hbmFnZXIiLCJzdWIiOiI2MDEwNjA0Ni1lZDUxLTQ3MzktOWI3YS1lM2QzMDYyYjhmNDcifQ.y8tJn_XWdpn7d7OvCHPbMrRmDzBEYvwSJ-470WiQq9caUpruz0A6Wal3S4t-YfCYR_c5e6j29q365J-R2wC_RtqEbSRjGSrc7W3k5btG3hke5rJpkNt_vTCsbQYw3RLs3QC1Mr-6khMWGwpu-j0BLaR3fiyZSG8D9Y9c48n-U94zQgddcGQh5d567sgOUpQp5uSOBE7Z3HEcQpAZm72729UNPHPGYux3beFSNJKDl4xwJT6mr5a6W6YJc9bW4mkXozVGfOkILRZolxjGCQ40w-95AeovC09Eq4A7Wjy77bpnL-ErskyyQrF9605T84IYd0m-AdEYmCVXmkv5k03Jzw',
                    //     refresh_token: 'refresh-token'
                    // }

                   const body = `{
                        login(username:"${request.body.username}",password:"${request.body.password}")
                        {
                          access_token: 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzczMzU3ODksImlhdCI6MTUzNzMzNDg4OSwianRpIjoiMzQxMDc5ZTEtOTc0OC00NWJkLWJlMmYtZjdkYmY4ZDNiMDFjIiwicm9sZSI6Im1hbmFnZXIiLCJzdWIiOiI2MDEwNjA0Ni1lZDUxLTQ3MzktOWI3YS1lM2QzMDYyYjhmNDcifQ.y8tJn_XWdpn7d7OvCHPbMrRmDzBEYvwSJ-470WiQq9caUpruz0A6Wal3S4t-YfCYR_c5e6j29q365J-R2wC_RtqEbSRjGSrc7W3k5btG3hke5rJpkNt_vTCsbQYw3RLs3QC1Mr-6khMWGwpu-j0BLaR3fiyZSG8D9Y9c48n-U94zQgddcGQh5d567sgOUpQp5uSOBE7Z3HEcQpAZm72729UNPHPGYux3beFSNJKDl4xwJT6mr5a6W6YJc9bW4mkXozVGfOkILRZolxjGCQ40w-95AeovC09Eq4A7Wjy77bpnL-ErskyyQrF9605T84IYd0m-AdEYmCVXmkv5k03Jzw',
                          refresh_token: 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzczMzU3ODksImlhdCI6MTUzNzMzNDg4OSwianRpIjoiMzQxMDc5ZTEtOTc0OC00NWJkLWJlMmYtZjdkYmY4ZDNiMDFjIiwicm9sZSI6Im1hbmFnZXIiLCJzdWIiOiI2MDEwNjA0Ni1lZDUxLTQ3MzktOWI3YS1lM2QzMDYyYjhmNDcifQ.y8tJn_XWdpn7d7OvCHPbMrRmDzBEYvwSJ-470WiQq9caUpruz0A6Wal3S4t-YfCYR_c5e6j29q365J-R2wC_RtqEbSRjGSrc7W3k5btG3hke5rJpkNt_vTCsbQYw3RLs3QC1Mr-6khMWGwpu-j0BLaR3fiyZSG8D9Y9c48n-U94zQgddcGQh5d567sgOUpQp5uSOBE7Z3HEcQpAZm72729UNPHPGYux3beFSNJKDl4xwJT6mr5a6W6YJc9bW4mkXozVGfOkILRZolxjGCQ40w-95AeovC09Eq4A7Wjy77bpnL-ErskyyQrF9605T84IYd0m-AdEYmCVXmkv5k03Jzw'
                        }
                      }`

                    return of(new HttpResponse({ status: 200, body }))
                } else {
                    // else return 400 bad request
                    return throwError({ error: { message: 'Incorrect username or password. Please try again' } })
                }
            }

            // get users
            if (request.url.endsWith('/users') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid,
                // this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer access-token') {
                    return of(new HttpResponse({ status: 200, body: [testUser] }))
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError({ error: { message: 'Unauthorised' } })
                }
            }

            if (request.url.endsWith('/inventory/add-inv') && request.method === 'POST') {
                if (request.headers.get('Authorization') === 'Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MzczMzU3ODksImlhdCI6MTUzNzMzNDg4OSwianRpIjoiMzQxMDc5ZTEtOTc0OC00NWJkLWJlMmYtZjdkYmY4ZDNiMDFjIiwicm9sZSI6Im1hbmFnZXIiLCJzdWIiOiI2MDEwNjA0Ni1lZDUxLTQ3MzktOWI3YS1lM2QzMDYyYjhmNDcifQ.y8tJn_XWdpn7d7OvCHPbMrRmDzBEYvwSJ-470WiQq9caUpruz0A6Wal3S4t-YfCYR_c5e6j29q365J-R2wC_RtqEbSRjGSrc7W3k5btG3hke5rJpkNt_vTCsbQYw3RLs3QC1Mr-6khMWGwpu-j0BLaR3fiyZSG8D9Y9c48n-U94zQgddcGQh5d567sgOUpQp5uSOBE7Z3HEcQpAZm72729UNPHPGYux3beFSNJKDl4xwJT6mr5a6W6YJc9bW4mkXozVGfOkILRZolxjGCQ40w-95AeovC09Eq4A7Wjy77bpnL-ErskyyQrF9605T84IYd0m-AdEYmCVXmkv5k03Jzw') {
                    const inventoryStuff = request.body
                    localStorage.setItem('inv', inventoryStuff)
                    const body = {reply: 'Inventory added'}
                    return of(new HttpResponse({status: 200}))
                }
                else {
                    return throwError({ error: { message: 'Unable to add inventory'}})
                }
            }

            // pass through any requests not handled above
            return next.handle(request)
        }))

        // call materialize and dematerialize to ensure delay even if
        // an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(10))
        .pipe(dematerialize())
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
}
