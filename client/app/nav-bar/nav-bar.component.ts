import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'nav-bar',
    template: `
    <i 
        class="material-icons menu-button"
        (click)="onShowMenu()"
    >
        menu
    </i>
    <div class="nav-container">
        <nav *ngIf="showMenu">
            <ul class="flexbox-container">
                <li><a routerLink="quote">Quotes</a></li>
                <li><a routerLink="category">Categories</a></li>
            </ul>
        </nav>
    </div>
    `
})

export class NavBarComponent implements OnInit {
    showMenu: boolean

    constructor() { }

    ngOnInit() {
        this.showMenu = true
    }

    onShowMenu() {
        this.showMenu = true
    }
}