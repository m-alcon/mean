import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuotesApiService } from "../../services/quote.api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { Quote } from "../../models/quote";

@Component({
    selector: 'quote-detail',
    template: `
    <section class="container" *ngIf="quote">
        <div class="container-item">
            <h1>"{{ quote.text }}"</h1>
            <ul class="guion-list">
                <ul class="guion-list">
                    <li><label>Character: </label>{{quote.character.name}}</li>
                    <li><label>Actor: </label>{{quote.character.actor}}</li>
                    <ul class="guion-list">
                        <li><label>Movie: </label>{{quote.character.movie.title}}</li>
                        <li><label>Director: </label>{{quote.character.movie.director}}</li>
                        <li><label>Year: </label>{{quote.character.movie.year}}</li>
                    </ul>
                </ul>
                <ul class="guion-list">
                    <li><label>Category: </label>{{quote.category.name}}</li>
                </ul>
            </ul>
            <i routerLink="" class="material-icons back-button" 
                >arrow_back</i>
        </div>
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
                this.quote.character.movie = 
                    await this.api.getMovie(this.quote.character.movie_id.toString())
                console.log(this.quote)
            } catch (error) {
                this.router.navigate(["404"], {skipLocationChange: true})
            }
        })
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe()
    }
}