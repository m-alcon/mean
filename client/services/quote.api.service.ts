import { Injectable, ViewChild } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Quote } from "../models/quote"

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User } from "../models/user";
import { Router } from "@angular/router";
import { Movie } from "../models/movie";
import { Character } from "../models/character";
import { LoginComponent } from "../app/login/login.component";

@Injectable()
export class QuotesApiService {
     // Resolve HTTP using the constructor

     constructor (
        private http: Http,
        private router: Router
    ) {}

    private catchError(error) {
        this.router.navigate([`error/${error.status}`],{skipLocationChange: true})
    }

    private get(url: string, params?: URLSearchParams) : Promise<any> {
        if (params) {
            return this.http.get("/api/" + url, {search: params})
            .toPromise()
            .then(response => response.json())
            .catch(this.catchError)
        }
        else return this.http.get("/api/" + url)
            .toPromise()
            .then(response => response.json())
            .catch(this.catchError)
    }

    private post(url: string, body:any) : Promise<any> {
        return this.http.post("/api/" + url, body)
            .toPromise()
            .then(response => response.json())
            .catch(this.catchError)
    }

    private put(url: string, body:any) : Promise<any> {
        return this.http.put("/api/" + url, body)
            .toPromise()
            .then(response => response.json())
            .catch(this.catchError)
    }

    login(user: User) {
        return this.http.post("/api/login", user)
            .toPromise()
            .then(response => {
                response.json()
                this.router.navigate(["quote"],{skipLocationChange: true})
            })
            .catch(error => {
                if (error.status == 400)
                    this.router.navigate(["error/not-valid"],{skipLocationChange: true})
                else if (error.status == 401)
                    this.router.navigate(["error/not-correct"],{skipLocationChange: true})
                else this.catchError(error)
            })
    }

    signup(user: User) {
        return this.post("signup", user)
    }

    logout() {
        return this.post("logout", [])
    }

    validate(token: string) {
        let params: URLSearchParams = new URLSearchParams()
        params.set("token",token)
        return this.get("confirm-email", params)
    }

    getQuotes() : Promise<any> {
        return this.get("quotes")
    }

    getQuote(id:string) : Promise<any> {
        return this.get("quotes/" + id)
    }

    getCategories() : Promise<any> {
        return this.get("categories")
    }

    getCategory(id:string) : Promise<any> {
        return this.get("categories/" + id)
    }

    getCharacters() : Promise<any> {
        return this.get("characters")
    }

    getCharacter(id:string) : Promise<any> {
        return this.get("characters/" + id)
    }

    getMovies() : Promise<any> {
        return this.get("movies")
    }

    getMovie(id:string) : Promise<any> {
        return this.get("movies/" + id)
    }

    postQuote(quote:Quote) {
        return this.post("quotes",quote)
    }

    putQuote(quote:Quote) {
        this.put("quotes/" + quote.id, quote)
    }

    postCharacter(character:Character) {
        return this.post("characters",character)
    }
    
    postMovie(movie:Movie) {
        return this.post("movies",movie)
    }

}