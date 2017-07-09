import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'not-valid',
    template: `
        <section class="container">
            <div class="container-item big-font">Your email has not confirmed yet.</div>
        </section>
        
    `
})

export class NotValidComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}