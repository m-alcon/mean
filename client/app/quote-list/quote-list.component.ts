import { Component, OnInit, ViewChild } from '@angular/core';
import { Quote } from "../../models/quote";
import { QuotesApiService } from "../../services/quote.api.service";
import { QuoteFormComponent } from "./quote-form.component";

@Component({
    selector: 'quote-list',
    template: `
        <div class="flex-container-column">
            <h1 class="text-center flex-item">Quotes list</h1>
            <button class="add-button flex-item" (click)="onShowForm()">+ Add Quote</button>
            <div class="flex-item-quote"
                *ngFor="let quote of quotes">
                <h2 class="quote-text">"{{quote.text}}"</h2>
                <p class="quote-character">{{quote.character?.name}}</p>
            </div>
            
        </div>
        <quote-form 
            #quoteForm
            (onSubmitted)="onNewQuoteAdded()"
        >
        </quote-form>
    `
})

export class QuoteListComponent implements OnInit {
    quotes: Quote[]
    @ViewChild (QuoteFormComponent)
    quoteForm: QuoteFormComponent

    constructor(private api: QuotesApiService) { }

    async ngOnInit() { 
        try {
            this.quotes = await this.api.getQuotes()
        } catch (error) {
            
        }
    }

    onShowForm() {
        this.quoteForm.open()
    }

    onNewQuoteAdded(quote: Quote) {
        this.quotes.push(quote)
        this.quoteForm.close()
    }
}