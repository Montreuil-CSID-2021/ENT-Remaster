import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {AppComponentEdt} from "./edt/app.component.edt";
import {AppComponentHome} from "./home/app.component.home";
import {AppComponentSearch} from "./search/app.component.search";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path : 'home', component: AppComponentHome},
  {path : 'edt', component: AppComponentEdt},
  {path : 'search', component: AppComponentSearch, pathMatch: 'full'}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
