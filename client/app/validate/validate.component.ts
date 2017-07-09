import { Component, OnInit } from '@angular/core';
import { QuotesApiService } from "../../services/quote.api.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'validate-component',
    template: `
        <section class="container">
            <div class="container-item">{{message}}</div>
        </section>
    `
})

export class ValidateComponent implements OnInit {
    message: string
    constructor() { }

    ngOnInit() {
        this.message = "Email validated. Thank you for registering our web."
    }
}