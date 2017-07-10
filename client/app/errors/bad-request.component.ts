import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: 'bad-request',
    template: `
        <section class="container">
            <div class="container-item big-font">You have completed a form incorrectly. Operation failed.</div>
        </section>
        
    `
})

export class BadRequestComponent implements OnInit, OnDestroy {
    interval: any

    constructor(private router: Router) {}

    ngOnInit() {
        this.interval = setInterval(() => this.router.navigate([""]), 2000) 
    }

    ngOnDestroy() {
        if (this.interval)
            clearInterval(this.interval)
    }
}