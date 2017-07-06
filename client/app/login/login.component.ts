import { Component, OnInit } from '@angular/core';
import { User } from "../../models/user";
import { QuotesApiService } from "../../services/quote.api.service";

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
                >
                <button 
                    class="form-button"
                    (click)="onSendLogin()"
                >
                    Log in
                </button>
             </div>
        </section>
       
    `
})

export class LoginComponent implements OnInit {
    user: User

    constructor(private api: QuotesApiService) { }

    ngOnInit() {
        this.user = new User()
    }

    onSendLogin() {
        this.api.login(this.user)
    }
}