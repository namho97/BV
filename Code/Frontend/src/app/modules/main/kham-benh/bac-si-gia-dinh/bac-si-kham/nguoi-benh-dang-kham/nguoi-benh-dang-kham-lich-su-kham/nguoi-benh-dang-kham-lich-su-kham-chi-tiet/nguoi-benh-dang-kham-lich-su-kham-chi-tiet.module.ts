import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NguoiBenhDangKhamLichSuKhamChiTietComponent } from './nguoi-benh-dang-kham-lich-su-kham-chi-tiet.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LichSuKhamChiTietModule } from '../../../../lich-su-kham/lich-su-kham-chi-tiet/lich-su-kham-chi-tiet.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    FlexLayoutModule,
    LichSuKhamChiTietModule
  ],
  exports:[NguoiBenhDangKhamLichSuKhamChiTietComponent],
  declarations: [NguoiBenhDangKhamLichSuKhamChiTietComponent]
})
export class NguoiBenhDangKhamLichSuKhamChiTietModule { }
