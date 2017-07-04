import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'not-found',
    template: `
        <div>Page not found</div>
    `
})

export class NotFoundComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}