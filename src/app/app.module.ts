import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModalComponent } from './components/modal/modal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ModalComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularMaterialModule,
    HttpClientModule,
    FormsModule,
  ],
  entryComponents: [ModalComponent],
  providers: [{
    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    useValue: { appearance: "fill" }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
