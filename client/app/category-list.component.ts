import { Component, OnInit } from "@angular/core";
import { QuotesApiService } from "../services/quote.api.service";
import { Category } from "../models/category"

@Component({
    selector: "category-list",
    template: `
        <ul>
            <li 
                *ngFor="let category of categories"
                routerLink="/category/id">
                {{ category.name }}
            </li>
            <div *ngIf="description">{{ description }}</div>
        </ul>`,
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