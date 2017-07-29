import { Component, OnInit } from "@angular/core";

@Component({
    selector: "main-app",
    template: `
        <div class="main-app-component">
            <nav-bar></nav-bar>
            <router-outlet></router-outlet>
        </div>
    `
})
export class AppComponent {
}