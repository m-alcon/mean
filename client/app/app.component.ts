import { Component } from "@angular/core";
import { AppService } from "./app.service";
import { Quote } from "./quote"

@Component({
    selector: "main-app",
    template: `
        <ul>
            <li>{{quote}}</li>
            <li>{{character}}</li>
        </ul>`,
    styles: [   
                "ul {list-style: none;padding: 30px;color: white;max-width:80%;margin:0;}",
                "li {color: white;line-height: 40px;}",
                "li + li {text-align: right;color: grey;margin-top: 6px; font-size: 16px;}"
            ]
    //templateUrl: "./app.html"
})
export class AppComponent {
    quotes: Object[]
    errorMessage: string
    quote: string
    character: string

    constructor (private quoteService: AppService) {}

    ngOnInit() {
        this.getQuotes()
    }

    getQuotes() {
        this.quoteService.getQuotes()
            .subscribe(
                res => {
                    this.quotes = res
                    let ran = Math.floor(Math.random()*res.length)
                    this.quote = res[ran]["text"]
                    this.character = res[ran]["character"]["name"]
                }
            )}

}