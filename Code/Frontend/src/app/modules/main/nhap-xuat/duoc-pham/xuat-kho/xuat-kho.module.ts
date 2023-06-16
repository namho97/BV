import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XuatKhoComponent } from './xuat-kho.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { XuatKhoRoutingModule } from './xuat-kho-routing.module';

@NgModule({
  imports: [
    CommonModule,
    XuatKhoRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [XuatKhoComponent]
})
export class XuatKhoModule { }
