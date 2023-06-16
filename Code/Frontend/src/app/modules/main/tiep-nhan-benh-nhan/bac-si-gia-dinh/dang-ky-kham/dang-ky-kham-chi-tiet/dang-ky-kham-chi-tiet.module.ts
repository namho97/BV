import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DangKyKhamChiTietComponent } from './dang-ky-kham-chi-tiet.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ThuVienPhiRutGonModule } from 'src/app/modules/main/thu-ngan/bac-si-gia-dinh/thu-vien-phi-rut-gon/thu-vien-phi-rut-gon.module';
import { TimKiemNguoiBenhModule } from '../../../dung-chung/tim-kiem-nguoi-benh/tim-kiem-nguoi-benh.module';
import { DonViHanhChinhChiTietModule } from 'src/app/modules/main/quan-tri/nhom-hanh-chinh/don-vi-hanh-chinh/don-vi-hanh-chinh-chi-tiet/don-vi-hanh-chinh-chi-tiet.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    ThuVienPhiRutGonModule,
    TimKiemNguoiBenhModule,
    DonViHanhChinhChiTietModule
  ],
  exports:[DangKyKhamChiTietComponent],
  declarations: [DangKyKhamChiTietComponent]
})
export class DangKyKhamChiTietModule { }
