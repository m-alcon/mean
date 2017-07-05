import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Quote } from "../../models/quote";
import { Http } from "@angular/http";
import { QuotesApiService } from "../../services/quote.api.service";
import { Category } from "../../models/category";
import { Character } from "../../models/character";

@Component({
    selector: 'quote-form',
    template: `
    <div class="overlay" *ngIf="isActive">
        <div class="form-box">
            <button class="close-button" (click)="close()">X</button>
            <form (ngSubmit)="onSubmit()" #quoteForm="ngForm">
                <div class="form-content"><label>Text</label>
                    <textarea class="formulary-text-input"
                        [(ngModel)] ="quote.text"
                        maxlength="200"
                        minlength="3"
                        required
                        placeholder="Quote text"
                        name="text"
                        #text="ngModel"> 
                    </textarea>
                </div>
                <div *ngIf="text.invalid && text.dirty">
                    This field is obligatory
                </div>
                <div class="form-content">
                    <label>Category</label>
                    <select class="formulary-text-input"
                        [(ngModel)] ="quote.category_id"
                        name="category"
                        #category="ngModel">
                        <option value="-1" disabled selected> Select a category</option>
                        <option 
                            *ngFor="let category of categories"
                            [value]="category.id"
                        >
                            {{category.name}}
                        </option>
                        <div *ngIf="category.invalid && category.dirty">
                            This field is obligatory
                        </div>
                    </select>
                </div>
                
                <div class="form-content">
                    <label>Character</label>
                    <select class="formulary-text-input"
                        [(ngModel)] ="quote.character_id"
                        name="character"
                        #character="ngModel">
                        <option value="-1"> Select a character</option>
                        <option 
                            *ngFor="let character of characters"
                            [value]="character.id"
                        >
                            {{character.name}}
                        </option>
                        <div *ngIf="character.invalid && character.dirty">
                            This field is obligatory
                        </div>
                    </select>
                </div>
                <div *ngIf="character.invalid && character.dirty">
                    This field is obligatory
                </div>
                <div>
                    <input 
                        class="button" 
                        type="submit" 
                        value="Submit"
                        [class.active]="quoteForm.form.invalid">
                </div>
            </form>
        </div>
    </div>
    `
})

export class QuoteFormComponent implements OnInit {
    quote: Quote
    categories: Category[]
    characters: Character[]
    isActive: boolean

    @Output() onSubmitted = new EventEmitter<Quote>()

    constructor(private api: QuotesApiService) {}

    async ngOnInit () {
        if (!this.isActive) return
        this.quote = new Quote()
        this.quote.category = new Category()
        this.quote.category_id = -1
        this.quote.character = new Character()
        this.quote.character_id = -1
        try {
            if (!this.categories)
                this.categories = await this.api.getCategories()
            if (!this.characters)
                this.characters = await this.api.getCharacters()
        } catch (error) {
            
        }
        
    }

    onSubmit () {
        this.api.postQuote(this.quote)
        this.onSubmitted.emit(this.quote);
    }

    close () {
        this.isActive = false;
    }

    open () {
        this.isActive = true;
        this.ngOnInit()
    }
}