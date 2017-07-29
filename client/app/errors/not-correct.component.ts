import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: 'not-correct',
    template: `
        <section class="container">
            <div class="container-item big-font">The email or the password are not correct.</div>
        </section>
        
    `
})

export class NotCorrectComponent implements OnInit, OnDestroy {
    timeout: any

    constructor(private router: Router) { }

    ngOnInit() {
        this.timeout = setTimeout(() => this.router.navigate(["login"]), 2000) 
    }

    ngOnDestroy() {
        if (this.timeout)
            clearTimeout(this.timeout)
    }
}