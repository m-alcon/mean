import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuotesApiService } from "../../services/quote.api.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'validate-component',
    template: `
        <section class="container">
            <div class="container-item big-font">{{message}}</div>
        </section>
    `
})

export class ValidateComponent implements OnInit, OnDestroy {
    message: string
    interval: any
    constructor(private router: Router) { }

    ngOnInit() {
        this.message = "Email validated. Thank you for registering our web."
        this.interval = setInterval(()=> this.router.navigate([""]), 2000) 
    }

    ngOnDestroy() {
        if (this.interval)
            clearInterval(this.interval)
    }
}