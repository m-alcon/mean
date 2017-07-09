import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { QuotesApiService } from "../../services/quote.api.service";
import { Router } from "@angular/router";

@Component({
    selector: 'logout',
    template: `
        <section class="container">
            <div class="container-item big-font">You have successfully logged out.</div>
        </section>
    `
})

export class LogoutComponent implements OnInit {

    constructor(
        private api: QuotesApiService,
        private auth: AuthService,
        private router: Router) { }

    async ngOnInit() {
        await this.api.logout()
        await this.auth.announceIsLogged()
        setTimeout(() => this.router.navigate([""]), 2000)
    }
}