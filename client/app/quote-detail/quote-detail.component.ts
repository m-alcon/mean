import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuotesApiService } from "../../services/quote.api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { Quote } from "../../models/quote";

@Component({
    selector: 'quote-detail',
    template: `
    <section *ngIf="quote">
        <h1>{{ quote.text }}</h1>
        <ul class="guion-list">
            <li>{{quote.character.name}}</li>
            <li>{{quote.category.name}}</li>
        </ul>
    </section>
    `
})

export class QuoteDetailComponent implements OnInit, OnDestroy {
    private routeSubscription: Subscription

    quote: Quote

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private api: QuotesApiService,
    ) { }

    ngOnInit() {
        this.routeSubscription = this.route.params.subscribe( async params => {
            try {
                this.quote = await this.api.getQuote(params.id)
            } catch (error) {
                this.router.navigate(["404"], {skipLocationChange: true})
            }
        })
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe()
    }
}