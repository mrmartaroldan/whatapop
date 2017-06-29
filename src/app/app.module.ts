import { SwitchComponent } from 'angular2-bootstrap-switch/components';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AccordionModule } from "ngx-accordion";

import { ConfirmDialogModule, ConfirmationService, InputSwitchModule, DropdownModule } from 'primeng/primeng';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BackendUriProvider } from './app-settings';
import { CategoryService } from './category.service';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductDetailsResolveService } from './product-details-resolve.service';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductResetComponent } from './product-reset/product-reset.component';
import { ProductService } from './product.service';
import { ProductsCollectionComponent } from './products-collection/products-collection.component';
import { SoldProductsResolveService } from './sold-products-resolve.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserService } from './user.service';
import { PublicationDatePipe } from './publication-date.pipe';


@NgModule({
  declarations: [
    AppComponent,
    ProductDetailsComponent,
    ProductFilterComponent,
    ProductResetComponent,
    ProductComponent,
    ProductsCollectionComponent,
    UserProfileComponent,
    PublicationDatePipe,
    SwitchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ConfirmDialogModule,
    AppRoutingModule,
    AccordionModule,
    InputSwitchModule,
    DropdownModule
  ],
  providers: [
    BackendUriProvider,
    CategoryService,
    ConfirmationService,
    ProductDetailsResolveService,
    ProductService,
    SoldProductsResolveService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
