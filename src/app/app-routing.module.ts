import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//PAGES
import { CategoryModuleComponent } from './pages/category-module/category-module.component';
import { CymbalModuleComponent } from './pages/cymbal-module/cymbal-module.component';



const routes: Routes = [
  { path: 'category-page', component: CategoryModuleComponent },
  { path: 'cymbal-page/:id', component: CymbalModuleComponent },
  { path: '', pathMatch: 'full', redirectTo: 'category-page' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
