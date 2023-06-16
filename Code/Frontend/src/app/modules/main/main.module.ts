import { HeaderModule } from './../../shared/layout/header/header.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { BrowserModule } from '@angular/platform-browser';
import { MainRoutingModule } from './main-routing.module';
import { RouterModule } from '@angular/router';
import { SidenavModule } from 'src/app/shared/layout/sidenav/sidenav.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    MainRoutingModule,
    FlexLayoutModule,
    HeaderModule,
    SidenavModule,
    MaterialModule,
    SharedModule,
    NgScrollbarModule
  ],
  declarations: [MainComponent]
})
export class MainModule { }
