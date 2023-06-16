import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DuocPhamChiTietComponent } from './duoc-pham-chi-tiet.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DonViTinhChiTietModule } from '../../don-vi-tinh/don-vi-tinh-chi-tiet/don-vi-tinh-chi-tiet.module';
import { DuongDungChiTietModule } from '../../duong-dung/duong-dung-chi-tiet/duong-dung-chi-tiet.module';
import { NhaSanXuatChiTietModule } from '../../nha-san-xuat/nha-san-xuat-chi-tiet/nha-san-xuat-chi-tiet.module';
import { QuocGiaChiTietModule } from '../../../nhom-hanh-chinh/quoc-gia/quoc-gia-chi-tiet/quoc-gia-chi-tiet.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    NgScrollbarModule,
    DonViTinhChiTietModule,
    DuongDungChiTietModule,
    NhaSanXuatChiTietModule,
    QuocGiaChiTietModule
  ],
  exports:[DuocPhamChiTietComponent],
  declarations: [DuocPhamChiTietComponent]
})
export class DuocPhamChiTietModule { }
