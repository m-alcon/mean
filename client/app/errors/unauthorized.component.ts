import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: 'unauthorized',
    template: `
        <section class="container">
            <div class="container-item big-font">Access is denied.</div>
        </section>
        
    `
})

export class UnauthorizedComponent implements OnInit, OnDestroy {
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