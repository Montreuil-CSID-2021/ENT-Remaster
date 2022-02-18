import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {AppComponent} from "./edt/app.component";
import {AppComponentHome} from "./login/app.component.home";

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
