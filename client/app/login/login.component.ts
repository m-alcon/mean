import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user";
import { QuotesApiService } from "../../services/quote.api.service";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'login',
    template: `
        <section class="login-component">
            <form  (ngSubmit)="onSendLogin()" class="form-box" #loginForm="ngForm">
                <h1 class="text.center">Log in</h1>
                <div *ngIf="message" class="error-message">
                    {{message}}
                </div>
                <label class="form-content">Username or Email</label>
                <input 
                    class="form-text-input"
                    type="text" 
                    name="username"
                    [(ngModel)]="user.email"
                    #username="ngModel"
                    maxlength="100"
                    required
                >
                <div class="little-font" *ngIf="username.invalid && username.dirty">
                    This field is obligatory (at most 100 characters)
                </div>
                <label class="form-content">Password</label>
                <input 
                    class="form-text-input"
                    type="password" 
                    name="password"
                    [(ngModel)]="user.password"
                    (keyup.enter)="onSendLogin()"
                    #password="ngModel"
                    minlength="3"
                    required
                >
                <div class="little-font" *ngIf="password.invalid && password.dirty">
                    This field is obligatory (at least 3 characters)
                </div>
                <input
                    type="submit" 
                    value="Log in"
                    class="form-button"
                    [class.inactive]="loginForm.form.invalid"
                >
             </form>
        </section>
       
    `
})

export class LoginComponent implements OnInit {
    user: User
    message: string;

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
            this.user.username = this.user.email
            await this.api.login(this.user)
            this.auth.announceIsLogged()
        } catch (error) {
            console.log(error)
        }
       
    }

    onNotValid () {
        console.log("VALID")
        this.message = "Your email has not confirmed yet."
    }

    onNotCorrect () {
        console.log("CORRECT")
        this.message = "The email or the password are not correct."
    }
}