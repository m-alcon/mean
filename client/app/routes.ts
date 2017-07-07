import { Routes } from "@angular/router"
import { CategoryListComponent } from "./category-list/category-list.component"
import { CategoryDetailComponent } from "./category-detail/category-detail.component"
import { NotFoundComponent } from "./errors/not-found.component"
import { QuoteListComponent } from "./quote-list/quote-list.component";
import { QuoteDetailComponent } from "./quote-detail/quote-detail.component";
import { LoginComponent } from "./login/login.component";


export const appRoutes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "", component: QuoteListComponent },
    { path: "quote/:id", component: QuoteDetailComponent },
    { path: "category", component: CategoryListComponent },
    { path: "category/:id", component: CategoryDetailComponent},
    { path: "404", component: NotFoundComponent },
    { path: "**", redirectTo: "404" }
]