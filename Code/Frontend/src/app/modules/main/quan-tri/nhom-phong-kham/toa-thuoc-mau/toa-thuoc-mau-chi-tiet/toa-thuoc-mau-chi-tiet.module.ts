import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToaThuocMauChiTietComponent } from './toa-thuoc-mau-chi-tiet.component';
import { IcdChiTietModule } from '../../icd/icd-chi-tiet/icd-chi-tiet.module';
import { HoSoNhanVienChiTietModule } from '../../../nhom-nhan-vien/ho-so-nhan-vien/ho-so-nhan-vien-chi-tiet/ho-so-nhan-vien-chi-tiet.module';
import { DuocPhamChiTietModule } from '../../../nhom-duoc-pham/duoc-pham/duoc-pham-chi-tiet/duoc-pham-chi-tiet.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    IcdChiTietModule,
    HoSoNhanVienChiTietModule,
    DuocPhamChiTietModule
  ],
  exports:[ToaThuocMauChiTietComponent],
  declarations: [ToaThuocMauChiTietComponent]
})
export class ToaThuocMauChiTietModule { }
