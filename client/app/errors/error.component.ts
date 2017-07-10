import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
    selector: 'error',
    template: `
        <section class="container">
            <div class="container-item big-font">Internal server error.</div>
        </section>
        
    `
})

export class ErrorComponent implements OnInit {
    constructor() { }

    ngOnInit() {
    }
}