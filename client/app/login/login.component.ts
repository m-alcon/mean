import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user";
import { QuotesApiService } from "../../services/quote.api.service";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'login',
    template: `
        <section class="login-component">
            <div class="form-box">
                <h1 class="text.center">Login</h1>
                <label class="form-content">Username</label>
                <input 
                    class="form-text-input"
                    type="text" 
                    name="username"
                    [(ngModel)]="user.email"
                >
                <label class="form-content">Password</label>
                <input 
                    class="form-text-input"
                    type="password" 
                    name="password"
                    [(ngModel)]="user.password"
                    (keyup.enter)="onSendLogin()"
                >
                
                <input
                    type="submit" 
                    value="Login"
                    class="form-button"
                    (click)="onSendLogin()"
                >
             </div>
        </section>
       
    `
})

export class LoginComponent implements OnInit {
    user: User

    constructor(
        private api: QuotesApiService,
        private auth: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        this.user = new User()
    }

    async onSendLogin() {
        try {
            await this.api.login(this.user)
            this.auth.announceIsLogged()
            this.router.navigate([""])
        } catch (error) {
            console.log(error)
        }
       
    }
}