import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeCallComponent} from "./home-call/home-call.component";

const routes: Routes = [
  {
    path:'home',
    component: HomeCallComponent
  },
  {
    path:'',
    redirectTo: '/home', pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
