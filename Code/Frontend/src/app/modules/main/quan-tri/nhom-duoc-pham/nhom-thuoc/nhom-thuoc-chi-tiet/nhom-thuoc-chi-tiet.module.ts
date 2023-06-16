import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NhomThuocChiTietComponent } from './nhom-thuoc-chi-tiet.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  exports:[NhomThuocChiTietComponent],
  declarations: [NhomThuocChiTietComponent]
})
export class NhomThuocChiTietModule { }
