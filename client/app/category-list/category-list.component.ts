import { Component, OnInit } from "@angular/core";
import { QuotesApiService } from "../../services/quote.api.service";
import { Category } from "../../models/category"

@Component({
    selector: "category-list",
    template: `
        <section class="category-list-component container">
            <ul class="spaced-list selectable-list container-item">
                <li 
                    *ngFor="let category of categories">
                    <a routerLink="/category/{{category.id}}">{{ category.name }}</a>
                </li>
                <div *ngIf="description">{{ description }}</div>
            </ul>
        </section>
    `
})
export class CategoryListComponent {
    categories: Category[]
    description: string

    constructor(private api: QuotesApiService) {}

    async ngOnInit() {

        try {
            this.categories = await this.api.getCategories() 
        } catch (error) {
            //
        }
        
    }

    onShowDescription(category: Category) {
    }
}