import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThucHienThuThuatComponent } from './thuc-hien-thu-thuat.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ThucHienThuThuatRoutingModule } from './thuc-hien-thu-thuat-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ThucHienThuThuatRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [ThucHienThuThuatComponent]
})
export class ThucHienThuThuatModule { }
