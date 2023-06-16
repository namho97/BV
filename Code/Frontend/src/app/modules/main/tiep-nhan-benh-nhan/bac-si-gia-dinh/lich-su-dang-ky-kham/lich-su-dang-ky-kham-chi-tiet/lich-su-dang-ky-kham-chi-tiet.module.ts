import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LichSuDangKyKhamChiTietComponent } from './lich-su-dang-ky-kham-chi-tiet.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ThuVienPhiRutGonModule } from 'src/app/modules/main/thu-ngan/bac-si-gia-dinh/thu-vien-phi-rut-gon/thu-vien-phi-rut-gon.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    ThuVienPhiRutGonModule
  ],
  exports:[LichSuDangKyKhamChiTietComponent],
  declarations: [LichSuDangKyKhamChiTietComponent]
})
export class LichSuDangKyKhamChiTietModule { }
