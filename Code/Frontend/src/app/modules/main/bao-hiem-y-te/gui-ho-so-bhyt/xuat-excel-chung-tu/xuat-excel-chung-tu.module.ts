import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XuatExcelChungTuComponent } from './xuat-excel-chung-tu.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { XuatExcelChungTuRoutingModule } from './xuat-excel-chung-tu-routing.module';

@NgModule({
  imports: [
    CommonModule,
    XuatExcelChungTuRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [XuatExcelChungTuComponent]
})
export class XuatExcelChungTuModule { }
