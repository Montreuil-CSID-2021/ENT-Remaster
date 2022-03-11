import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {AppComponentEdt} from "./edt/app.component.edt";
import {AppComponentHome} from "./home/app.component.home";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path : 'home', component: AppComponentHome},
  {path : 'edt', component: AppComponentEdt}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
