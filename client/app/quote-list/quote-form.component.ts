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
        <section class="form-box-popup">
            <i class="material-icons close-button" (click)="close()">close</i>
            <form (ngSubmit)="onSubmit()" #quoteForm="ngForm">
                <div class="form-content"><label>Text</label>
                    <textarea class="form-text-input"
                        [(ngModel)] ="quote.text"
                        maxlength="200"
                        minlength="3"
                        required
                        placeholder="Quote text"
                        name="text"
                        #text="ngModel"> 
                    </textarea>
                </div>
                <div class="little-font" *ngIf="text.invalid && text.dirty">
                    This field is obligatory (at least 3 characters and at most 200)
                </div>
                <div class="form-content">
                    <label>Category</label>
                    <select class="form-text-input"
                        [(ngModel)] ="quote.category_id"
                        name="category"
                        required
                        #category="ngModel">
                        <option value="-1" disabled selected> Select a category</option>
                        <option 
                            *ngFor="let category of categories"
                            [value]="category.id"
                        >
                            {{category.name}}
                        </option>
                        <div class="little-font" *ngIf="category.invalid && category.dirty">
                            This field is obligatory
                        </div>
                    </select>
                </div>
                
                <div class="form-content">
                    <label>Character</label>
                    <select class="form-text-input"
                        [(ngModel)] ="quote.character_id"
                        name="character"
                        required
                        #character="ngModel">
                        <option value="-1"> Select a character</option>
                        <option 
                            *ngFor="let character of characters"
                            [value]="character.id"
                        >
                            {{character.name}}
                        </option>
                        <div class="little-font" *ngIf="character.invalid && character.dirty">
                            This field is obligatory
                        </div>
                    </select>
                </div>
                <div class="little-font" *ngIf="character.invalid && character.dirty">
                    This field is obligatory
                </div>
                <div>
                    <input 
                        class="form-button" 
                        type="submit" 
                        value="Submit"
                        [class.inactive]="quoteForm.form.invalid">
                </div>
            </form>
        </section>
    </div>
    `
})

export class QuoteFormComponent {
    quote: Quote
    categories: Category[]
    characters: Character[]
    isActive: boolean
    isEditing: boolean

    @Output() onSubmitted = new EventEmitter<Quote>()
    @Output() onUpdated = new EventEmitter<Quote>()

    constructor(private api: QuotesApiService) {}

    async init () {
        if (!this.isEditing) {
            this.quote = new Quote()
            this.quote.category_id = -1
            this.quote.character_id = -1
        }
        if (!this.isActive) return
        try {
            if (!this.categories)
                this.categories = await this.api.getCategories()
            if (!this.characters)
                this.characters = await this.api.getCharacters()
        } catch (error) {
            
        }
        
    }

    async onSubmit () {
        this.quote.character = this.characters[this.quote.character_id - 1]
        this.quote.category = this.categories[this.quote.category_id - 1]
    
        try {
            if (this.isEditing) {
                await this.api.putQuote(this.quote)
                this.onUpdated.emit(this.quote);
            }
            else {
                await this.api.postQuote(this.quote)
                this.onSubmitted.emit(this.quote);
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    close () {
        this.isActive = false;
        this.isEditing = false;
    }

    open (quote?: Quote) {
        this.isActive = true;
        this.init()
        if (quote) {
            this.isEditing = true
            this.quote = quote;
        }
    }
}