import { Component, OnInit, ViewChild } from '@angular/core';
import { Quote } from "../../models/quote";
import { QuotesApiService } from "../../services/quote.api.service";
import { QuoteFormComponent } from "./quote-form.component";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'quote-list',
    template: `
        <section class="container first-margin">
            <div class="container-item">
                <div class="flex-item">
                    <button 
                        class="add-button" 
                        (click)="onAddQuote()"
                        *ngIf="isLogged"
                        >+ Add Quote
                    </button>
                </div>
                <div class="flex-item-quote"
                    *ngFor="let quote of quotes">
                    <div class="container-quote"><h2 class="quote-text container-item">"{{quote.text}}"</h2></div>
                    <div class="quote-footer">
                        <i 
                            class="material-icons edit-button"
                            (click)="onEditQuote(quote.id)"
                            *ngIf="isLogged"
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
    isLogged: boolean

    @ViewChild (QuoteFormComponent)
    quoteForm: QuoteFormComponent

    constructor(
        private api: QuotesApiService,
        private auth: AuthService
    ) { }

    async ngOnInit() { 
        try {
            this.auth.isLogged$.subscribe(isLogged => {
                this.isLogged = isLogged
            })
            this.quotes = await this.api.getQuotes()
        } catch (error) {
            console.log(error)
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