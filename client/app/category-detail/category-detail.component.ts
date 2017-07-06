import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { ActivatedRoute, Router } from "@angular/router";
import { QuotesApiService } from "../../services/quote.api.service";
import { Category } from "../../models/category";

@Component({
    selector: 'category-detail',
    template: `
    <section class="container" *ngIf="category">
        <div class="container-item">
            <h1 class="text-center">{{ category.name }}</h1>
            <ul class="guion-list">
                <li *ngFor="let quote of category.quotes">
                    {{ quote.text }}
                </li>
            </ul>
        </div>
    </section>
    `
})

export class CategoryDetailComponent implements OnInit, OnDestroy {
    private routeSubscription: Subscription
    
    category: Category

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private api: QuotesApiService
    ) { }

    ngOnInit() {
        this.routeSubscription = this.route.params.subscribe( async param => {
            try {
                this.category = await this.api.getCategory(param.id)
            } catch (error) {
                this.router.navigate(["404"], {skipLocationChange: true})
            }
        })
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe()
    }
}