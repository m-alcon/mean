import { Component, OnInit } from '@angular/core';
import { QuotesApiService } from "../../services/quote.api.service";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { User } from "../../models/user";

@Component({
    selector: 'signup',
    template: `
        <section class="signup-component container">
            <form (ngSubmit)="onSendSignup()" *ngIf="!emailSended" class="form-box" #signupForm="ngForm">
                <h1 class="text.center">Sign up</h1>
                <label class="form-content">Username</label>
                <input 
                    class="form-text-input"
                    type="text" 
                    name="username"
                    [(ngModel)]="user.username"
                    #username="ngModel"
                    maxlength="100"
                    required
                >
                <div class="little-font" *ngIf="username.invalid && username.dirty">
                    This field is obligatory (at most 100 characters)
                </div>
                <label class="form-content">Email</label>
                <input 
                    class="form-text-input"
                    type="email" 
                    name="email"
                    [(ngModel)]="user.email"
                    (keyup.enter)="onSendSignup()"
                    #email="ngModel"
                    required
                >
                <div class="little-font" *ngIf="email.invalid && email.dirty">
                    This field is obligatory
                </div>
                <label class="form-content">Password</label>
                <input 
                    class="form-text-input"
                    type="password" 
                    name="password"
                    [(ngModel)]="user.password"
                    (keyup.enter)="onSendSignup()"
                    #password="ngModel"
                    minlength="3"
                    required
                >
                <div class="little-font" *ngIf="password.invalid && password.dirty">
                    This field is obligatory (at least 3 characters)
                </div>
                
                <input
                    type="submit" 
                    value="Sign up"
                    class="form-button"
                    [class.inactive]="signupForm.form.invalid"
                >
             </form>
            <div *ngIf="emailSended" class="container-item big-font">
                Validation email sended. Check your email inbox and confirm it.
            </div>
        </section>
       
    `
})

export class SignupComponent implements OnInit {
    user: User
    emailSended: boolean = false
    
    constructor(
        private api: QuotesApiService,
        private auth: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        this.user = new User()
    }

    async onSendSignup () {
        try {
            await this.api.signup(this.user)
            this.emailSended = true;
            this.auth.announceIsLogged()
            setTimeout(() => this.router.navigate([""]), 3000)
        } catch (error) {
            console.log(error, "signup")
        }
       
    }
}