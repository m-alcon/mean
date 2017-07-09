import { Component, OnInit } from "@angular/core";
import { QuotesApiService } from "../../services/quote.api.service";
import { Quote } from "../../models/quote"

@Component({
    selector: "random-quote",
    template: `
        <section class="container">
            <h1 class="container-item text-center">Welcome to Movie Quotes App</h1>
            <div class="flex-item-quote container-item">
                <div *ngIf="randomQuote" class="container-quote"><h2 class="quote-text container-item">"{{randomQuote.text}}"</h2></div>
                <div class="quote-footer">
                    <i 
                        class="material-icons shuffle-button"
                        (click)="onShowRandomQuote()"
                    >
                        shuffle
                    </i>
                    <p *ngIf="randomQuote" class="quote-character">{{randomQuote.character?.name}}</p>
                </div>
            </div>
            
        </section>
    `,
})
export class RandomQuoteComponent implements OnInit {
    quotes: Quote[]
    randomQuote: Quote

    constructor (private api: QuotesApiService) {}

    async ngOnInit() {
        try {
            this.quotes = await this.api.getQuotes()
        } catch (error) {
            alert(error)
        }
        this.onShowRandomQuote()        
    }

    onShowRandomQuote() {
        let ran = Math.floor(Math.random() * this.quotes.length)
        this.randomQuote = this.quotes[ran]
    }

}