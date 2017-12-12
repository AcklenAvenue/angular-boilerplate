import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreRouterConnectingModule, routerReducer } from "@ngrx/router-store";

import { AppComponent } from "./app.component";
import { appReducer } from "./app.reducer";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      // routes
    ]),
    StoreModule.forRoot({ app: appReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 50
    }),
    StoreRouterConnectingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
