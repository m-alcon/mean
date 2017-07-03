import { Routes } from "@angular/router"
import { CategoryListComponent } from "./category-list.component"
import { CategoryDetailComponent } from "./category-detail.component"
import { NotFoundComponent } from "./not-found.component"


export const appRoutes: Routes = [
    { path: "", component: CategoryListComponent },
    { path: "category/:id", component: CategoryDetailComponent},
    { path: "**", component: NotFoundComponent }
]