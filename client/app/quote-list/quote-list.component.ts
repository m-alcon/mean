import { Component, OnInit, ViewChild } from '@angular/core';
import { Quote } from "../../models/quote";
import { QuotesApiService } from "../../services/quote.api.service";
import { QuoteFormComponent } from "./quote-form.component";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'quote-list',
    template: `
        <section class="container">
            <div class="container-item">
                <h1 class="text-center flex-item">Quotes list</h1>
                <div class="flex-item">
                    <button class="add-button" (click)="onAddQuote()">+ Add Quote</button>
                </div>
                <div class="flex-item-quote"
                    *ngFor="let quote of quotes">
                    <h2 class="quote-text">"{{quote.text}}"</h2>
                    <div class="quote-footer">
                        <i 
                            class="material-icons edit-button"
                            (click)="onEditQuote(quote.id)"
                        >
                            mode_edit
                        </i>
                        <p class="quote-character">{{quote.character?.name}}</p>
                    </div>
                </div>
            </div>
            
        </section>
        <quote-form 
            #quoteForm
            (onSubmitted)="onNewQuoteAdded($event)"
            (onUpdated)="onQuoteUpdated($event)"
        >
        </quote-form>
    `
})

export class QuoteListComponent implements OnInit {
    quotes: Quote[]

    @ViewChild (QuoteFormComponent)
    quoteForm: QuoteFormComponent

    constructor(
        private api: QuotesApiService,
        private auth: AuthService
    ) { }

    async ngOnInit() { 
        console.log(this.auth.isAuthorized())
        try {
            this.quotes = await this.api.getQuotes()
        } catch (error) {
            
        }
    }

    onAddQuote() {
        this.quoteForm.open()
    }

    onEditQuote(id: number) {
        this.quoteForm.open(this.quotes[id - 1])
    }

    onNewQuoteAdded(quote: Quote) {
        this.quotes.push(quote)
        this.quoteForm.close()
    }

    onQuoteUpdated(quote: Quote) {
        let i = this.quotes.findIndex(q => q.id == quote.id)
        this.quotes[i] = quote
        this.quoteForm.close()
    }
}