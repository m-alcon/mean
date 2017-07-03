import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'category-detail',
    template: `
    <section>Soc una category</section>
    `
})

export class CategoryDetailComponent implements OnInit, OnDestroy {
    constructor(private route: ActivatedRoute) { }

    private routeSubscription: Subscription

    ngOnInit() {
        this.routeSubscription = this.route.params.subscribe( param => {
            console.log(param)
        })
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe()
    }
}