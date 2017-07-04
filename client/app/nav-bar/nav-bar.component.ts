import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'nav-bar',
    template: `
    <nav>
        <ul class="flexbox-container">
            <li routerLink="">Quotes</li>
            <li routerLink="">Categories</li>
        </ul>
    </nav>
    `
})

export class NavBarComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}