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
            .then(response => {
                return response.json()
            })
            .catch(error => console.error(error))
    }

    getQuotes() : Promise<any> {
        return this.get("quotes")
    }

    getCategories() : Promise<any> {
        return this.get("categories")
    }

}