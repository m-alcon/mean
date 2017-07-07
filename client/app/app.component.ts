import { Component, OnInit } from "@angular/core";

@Component({
    selector: "main-app",
    template: `
        <router-outlet>
            <nav-bar></nav-bar>
        </router-outlet>
    `
})
export class AppComponent {
}