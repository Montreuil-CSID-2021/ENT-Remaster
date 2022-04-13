import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {AppComponentEdt} from "./edt/app.component.edt";
import {AppComponentSearch} from "./search/app.component.search";

const routes: Routes = [
  {path : '', component: AppComponentEdt},
  {path : 'search', component: AppComponentSearch, pathMatch: 'full'}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
