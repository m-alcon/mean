import { Component, OnInit } from "@angular/core";
import { QuotesApiService } from "../services/quote.api.service";
import { Quote } from "../models/quote"

@Component({
    selector: "random-quote",
    template: `
        <div *ngIf="randomQuote" (click)="onShowCategories()">{{ randomQuote.text }}</div>
        <div *ngIf="randomQuote"> {{ randomQuote.character.name }}</div>
        <button (click)="onShowRandomQuote()">More</button> `,
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