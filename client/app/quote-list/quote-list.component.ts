import { Component, OnInit } from '@angular/core';
import { Quote } from "../../models/quote";
import { QuotesApiService } from "../../services/quote.api.service";

@Component({
    selector: 'quote-list',
    template: `
        <ul class="spaced-list selectable-list">
            <li 
                *ngFor="let quote of quotes"
                routerLink="quote/{{quote.id}}">{{quote.text}}</li>
        </ul>
        <quote-form *ngIf="showPopUp"></quote-form>
        <button (click)="onShowPopUp()">Add</button>
    `
})

export class QuoteListComponent implements OnInit {
    quotes: Quote[]
    showPopUp: boolean

    constructor(private api: QuotesApiService) { }

    async ngOnInit() { 
        this.showPopUp = false
        try {
            this.quotes = await this.api.getQuotes()
        } catch (error) {
            
        }
    }

    onShowPopUp() {
        this.showPopUp = true;
    }
}