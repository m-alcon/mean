import { Injectable } from '@angular/core';
import { NgXCookies } from 'ngx-cookies';

@Injectable()
export class AuthService {

    constructor() { }

    isAuthorized() {
        return NgXCookies.exists("api-token")
    }
}