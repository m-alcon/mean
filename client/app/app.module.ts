import { NgModule } from "@angular/core"
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { QuotesApiService } from "../services/quote.api.service";
import { RandomQuoteComponent } from "./random-quote.component";
import { CategoryListComponent } from "./category-list.component";
import { CategoryDetailComponent } from "./category-detail.component";
import { NotFoundComponent } from "./not-found.component"
import { RouterModule } from "@angular/router";
import { appRoutes } from "./routes"

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes),
        BrowserModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        RandomQuoteComponent,
        CategoryListComponent,
        CategoryDetailComponent,
        NotFoundComponent
    ],
    providers: [
        QuotesApiService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
