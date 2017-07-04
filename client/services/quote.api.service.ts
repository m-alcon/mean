import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Quote } from "../models/quote"

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class QuotesApiService {
     // Resolve HTTP using the constructor
     constructor (private http: Http) {}
     // private instance variable to hold base url

    private get(url: string) : Promise<any> {
        return this.http.get("/api/" + url)
            .toPromise()
            .then(response => response.json())
    }

    private post(url: string, body:any) : Promise<any> {
        return this.http.post("/api/" + url, body)
            .toPromise()
            .then(response => response.json())
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

    postQuote(quote:Quote) {
        this.post("quotes",quote)
    }

}