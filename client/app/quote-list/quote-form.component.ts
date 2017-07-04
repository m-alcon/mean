import { Component, OnInit } from '@angular/core';
import { Quote } from "../../models/quote";
import { Http } from "@angular/http";
import { QuotesApiService } from "../../services/quote.api.service";

@Component({
    selector: 'quote-form',
    template: `
    <form (ngSubmit)="onSubmit()">
        <div><label>Text:</label>
            <textarea
                [(ngModel)] ="quote.text"
                name="text"
                placeholder="Quote text"> 
            </textarea>
        </div>
        <div><label>Character:</label>
            <input 
                [(ngModel)] ="quote.character"
                type="text" 
                name="character"
                placeholder="Quote character">
        </div>
        <div><label>Category:</label>
            <input
                [(ngModel)] ="quote.category"
                name="category"
                type="text"
                placeholder="Quote category">
        </div>
        <div><input type="submit" value="Submit"></div>
    </form>
    `
})

export class QuoteFormComponent implements OnInit {
    quote: Quote

    constructor(private api: QuotesApiService) {}

    ngOnInit() {
        this.quote = new Quote()
        this.quote.text = "hello"
    }

    onSubmit() {
        this.api.postQuote(this.quote)
    }
}