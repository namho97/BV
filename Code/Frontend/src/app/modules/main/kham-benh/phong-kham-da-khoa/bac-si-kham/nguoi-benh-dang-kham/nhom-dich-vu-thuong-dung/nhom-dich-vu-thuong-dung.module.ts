import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NhomDichVuThuongDungComponent } from './nhom-dich-vu-thuong-dung.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    FlexLayoutModule
  ],
  exports:[NhomDichVuThuongDungComponent],
  declarations: [NhomDichVuThuongDungComponent]
})
export class NhomDichVuThuongDungModule { }
