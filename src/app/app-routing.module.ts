import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {AppComponent} from "./app.component";
import {AppComponentHome} from "./app.component.home";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path : 'home', component: AppComponentHome},
  {path : 'edt', component: AppComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
