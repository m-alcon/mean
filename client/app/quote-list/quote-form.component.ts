import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Quote } from "../../models/quote";
import { Http } from "@angular/http";
import { QuotesApiService } from "../../services/quote.api.service";
import { Category } from "../../models/category";
import { Character } from "../../models/character";
import { Movie } from "../../models/movie";

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
                    </select>
                    <div class="little-font" *ngIf="category.invalid && category.dirty">
                            This field is obligatory
                        </div>
                </div>
                
                <div class="form-content">
                    <label>Character</label>
                    <select class="form-text-input" (change)="onCharacterChange()"
                        [(ngModel)] ="quote.character_id"
                        name="character"
                        required
                        #character="ngModel">
                        <option value="-1" disabled selected> Select a character</option>
                        <option 
                            *ngFor="let character of characters"
                            [value]="character.id"
                        >
                            {{character.name}}
                        </option>
                        <option value="-2"> New character</option>
                        <div class="little-font" *ngIf="character.invalid && character.dirty">
                            This field is obligatory
                        </div>
                    </select>
                </div>
                <div class="little-font" *ngIf="character.invalid && character.dirty">
                    This field is obligatory
                </div>
                <div class="form-content" *ngIf="newCharacter&&quote.character"><label>Name</label>
                    <input class="form-text-input"
                        type="text"
                        [(ngModel)] ="quote.character.name"
                        maxlength="30"
                        minlength="3"
                        required
                        placeholder="Character name"
                        name="ctext"
                        #ctext="ngModel"> 
                </div>
                <div class="little-font" *ngIf="ctext?.invalid && ctext?.dirty">
                    This field is obligatory (at least 3 characters and at most 30)
                </div>
                <div class="form-content" *ngIf="newCharacter&&quote.character"><label>Actor</label>
                    <input class="form-text-input"
                        type="text"
                        [(ngModel)] ="quote.character.actor"
                        maxlength="100"
                        minlength="3"
                        required
                        placeholder="Actor of the character"
                        name="cactor"
                        #cactor="ngModel"> 
                </div>
                <div class="little-font" *ngIf="cactor?.invalid && cactor?.dirty">
                    This field is obligatory (at least 3 characters and at most 100)
                </div>
                 <div class="form-content" *ngIf="newCharacter">
                    <label>Movie</label>
                    <select class="form-text-input" (change)="onMovieChange()"
                        [(ngModel)] ="quote.character.movie_id"
                        name="movie"
                        required
                        #movie="ngModel">
                        <option value="-1" disabled selected> Select a movie</option>
                        <option 
                            *ngFor="let movie of movies"
                            [value]="movie.id"
                        >
                            {{movie.title}}
                        </option>
                        <option value="-2"> New movie</option>
                    </select>
                    <div class="little-font" *ngIf="movie.invalid && movie.dirty">
                            This field is obligatory
                        </div>
                </div>
                <div class="form-content" *ngIf="newMovie&&quote.character.movie"><label>Title</label>
                    <input class="form-text-input"
                        type="text"
                        [(ngModel)] ="quote.character.movie.title"
                        maxlength="50"
                        required
                        placeholder="Title of the movie"
                        name="mtitle"
                        #mtitle="ngModel"> 
                </div>
                <div class="little-font" *ngIf="mtitle?.invalid && mtitle?.dirty">
                    This field is obligatory (at most 50 characters)
                </div>
                <div class="form-content" *ngIf="newMovie&&quote.character.movie"><label>Director</label>
                    <input class="form-text-input"
                        type="text"
                        [(ngModel)] ="quote.character.movie.director"
                        maxlength="50"
                        required
                        placeholder="Director of the movie"
                        name="mdir"
                        #mdir="ngModel"> 
                </div>
                <div class="little-font" *ngIf="mdir?.invalid && mdir?.dirty">
                    This field is obligatory (at most 50 characters)
                </div>
                <div class="form-content" *ngIf="newMovie&&quote.character.movie"><label>Director</label>
                    <input class="form-text-input"
                        type="number"
                        [(ngModel)] ="quote.character.movie.year"
                        maxlength="50"
                        required
                        placeholder="Year of the movie"
                        name="myear"
                        #myear="ngModel"> 
                </div>
                <div class="little-font" *ngIf="myear?.invalid && myear?.dirty">
                    This field is obligatory (at most 50 characters)
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
    movies: Movie[]
    isActive: boolean
    isEditing: boolean
    newCharacter: boolean
    newMovie: boolean

    @Output() onSubmitted = new EventEmitter<Quote>()
    @Output() onUpdated = new EventEmitter<Quote>()

    constructor(
        private api: QuotesApiService) {}

    async init () {
        if (!this.isEditing) {
            this.quote = new Quote()
            this.quote.category_id = -1
            this.quote.character_id = -1
            this.newCharacter = false
            this.newMovie = false
        }
        if (!this.isActive) return
        try {
            if (!this.categories)
                this.categories = await this.api.getCategories()
            if (!this.characters)
                this.characters = await this.api.getCharacters()
            if (!this.movies)
                this.movies = await this.api.getMovies()
        } catch (error) {
            
        }
        
    }

    async onSubmit () {
        this.quote.category = this.categories[this.quote.category_id - 1]
    
        try {
            if (this.newMovie) {
                    await this.api.postMovie(this.quote.character.movie)
                    delete this.quote.character.movie
                    this.quote.character.movie_id = this.movies.length + 1
            }
            else {
                delete this.quote.character.movie
                this.quote.character.movie_id = this.movies[this.quote.character.movie_id - 1].id
            }
            if (this.newCharacter) {
                await this.api.postCharacter(this.quote.character)
                var characterSave = this.quote.character
                delete this.quote.character
                this.quote.character_id = this.characters.length + 1
            }
            else {
                delete this.quote.character
                this.quote.character_id = this.characters[this.quote.character_id - 1].id
            }

            if (this.isEditing) {
                await this.api.putQuote(this.quote)
                this.quote.character = characterSave
                this.onUpdated.emit(this.quote);
            }
            else {
                await this.api.postQuote(this.quote)
                this.quote.character = characterSave
                this.onSubmitted.emit(this.quote);
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    onCharacterChange() {
        this.newCharacter = this.quote.character_id == -2
        if (this.newCharacter) {
            this.quote.character = new Character()
            this.quote.character.movie_id = -1
        }
    }

    onMovieChange() {
        this.newMovie = this.newCharacter && this.quote.character.movie_id == -2
        if (this.newMovie) {
            this.quote.character.movie = new Movie()
        }
    }

    close () {
        this.isActive = false;
        this.isEditing = false;
    }

    open (quote?: Quote) {
        this.isActive = true;
        if (quote) {
            this.isEditing = true
            this.quote = quote;
        }
        this.init()
    }
}