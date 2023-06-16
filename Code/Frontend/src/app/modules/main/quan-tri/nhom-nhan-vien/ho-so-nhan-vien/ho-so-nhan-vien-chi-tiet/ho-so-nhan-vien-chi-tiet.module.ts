import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoSoNhanVienChiTietComponent } from './ho-so-nhan-vien-chi-tiet.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  declarations: [HoSoNhanVienChiTietComponent],
  exports:[HoSoNhanVienChiTietComponent]
})
export class HoSoNhanVienChiTietModule { }
