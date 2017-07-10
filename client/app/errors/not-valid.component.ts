import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: 'not-valid',
    template: `
        <section class="container">
            <div class="container-item big-font">Your email has not confirmed yet.</div>
        </section>
        
    `
})

export class NotValidComponent implements OnInit {
    constructor(private router: Router) { }

    ngOnInit() {
        setInterval(() => this.router.navigate(["login"]), 2000) 
    }
}