import { Component, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'nav-bar',
    template: `
    <i  
        [@visualizeButton]="state"
        class="material-icons menu-button"
        (click)="onShowMenu()"
    >
        menu
    </i>
    <div [@visualizeMenu]="state" class="nav-container">
        <i class="material-icons close-button" (click)="onShowMenu()">close</i>
        <nav>
            <ul class="flexbox-container">
                <li><a 
                    (click)="onShowMenu()"
                    routerLink="login"
                    *ngIf="!isLogged"
                    >Login</a></li>
                <li><a (click)="onShowMenu()" routerLink="">Quotes</a></li>
                <li><a (click)="onShowMenu()" routerLink="category">Categories</a></li>
            </ul>
        </nav>
    </div>
    `,
    animations: [
        trigger("visualizeMenu",[
            state("out",style({
                left: "-25%"
            })),
            state("in", style({
                left: "0"
            })),
            transition('out => in', animate('0.5s ease-out')),
            transition('in => out', animate('0.5s ease-in'))
        ]),
         trigger("visualizeButton",[
            state("in",style({
                'font-size': "0px",
                transform: "rotate(0deg)"
            })),
            state("out", style({
                'font-size': "6vw",
                transform: "rotate(360deg)"
            })),
            transition('out => in', animate('0.5s linear')),
            transition('in => out', animate('0.5s linear'))
        ]),
    ]
})

export class NavBarComponent implements OnInit {
    showMenu: boolean = false
    state: string = "out"
    isLogged: boolean

    constructor(private auth: AuthService) {}

    ngOnInit() {
        this.auth.isLogged$.subscribe(isLogged => {
            this.isLogged = isLogged
        })
    }

    onShowMenu() {
        this.showMenu = !this.showMenu;
        this.state = this.showMenu ? 'in' : 'out';
    }
}