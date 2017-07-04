import { NgModule } from "@angular/core"
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { appRoutes } from "./routes"
import { QuotesApiService } from "../services/quote.api.service";
import { RandomQuoteComponent } from "./random-quote.component";
import { CategoryListComponent } from "./category-list/category-list.component";
import { CategoryDetailComponent } from "./category-detail/category-detail.component";
import { NotFoundComponent } from "./errors/not-found.component"

import { QuoteListComponent } from "./quote-list/quote-list.component";
import { QuoteDetailComponent } from "./quote-detail/quote-detail.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { QuoteFormComponent } from "./quote-list/quote-form.component";

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes),
        BrowserModule,
        HttpModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        RandomQuoteComponent,
        CategoryListComponent,
        CategoryDetailComponent,
        QuoteListComponent,
        QuoteDetailComponent,
        QuoteFormComponent,
        NavBarComponent,
        NotFoundComponent
    ],
    providers: [
        QuotesApiService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
