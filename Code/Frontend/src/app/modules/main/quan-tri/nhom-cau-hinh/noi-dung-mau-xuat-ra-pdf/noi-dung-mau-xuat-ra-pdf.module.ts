import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoiDungMauXuatRaPdfComponent } from './noi-dung-mau-xuat-ra-pdf.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoiDungMauXuatRaPdfRoutingModule } from './noi-dung-mau-xuat-ra-pdf-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NoiDungMauXuatRaPdfRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [NoiDungMauXuatRaPdfComponent]
})
export class NoiDungMauXuatRaPdfModule { }
