import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Mis Componentes 
import { CategoryModuleComponent } from './pages/category-module/category-module.component';
import { RegisterCategoryComponent } from './pages/category-module/register-category/register-category.component';
import { UpdateCategoryComponent } from './pages/category-module/update-category/update-category.component';
import { CymbalModuleComponent } from './pages/cymbal-module/cymbal-module.component';
import { UpdateCymbalComponent } from './pages/cymbal-module/update-cymbal/update-cymbal.component';
import { RegisterCymbalComponent } from './pages/cymbal-module/register-cymbal/register-cymbal.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoryModuleComponent,
    RegisterCategoryComponent,
    UpdateCategoryComponent,
    CymbalModuleComponent,
    RegisterCymbalComponent,
    UpdateCymbalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
