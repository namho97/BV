import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LichSuKhamChiTietComponent } from './lich-su-kham-chi-tiet.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LichSuKhamChiTietThongTinHanhChinhModule } from './lich-su-kham-chi-tiet-thong-tin-hanh-chinh/lich-su-kham-chi-tiet-thong-tin-hanh-chinh.module';
import { LichSuKhamChiTietKhamBenhModule } from './lich-su-kham-chi-tiet-kham-benh/lich-su-kham-chi-tiet-kham-benh.module';
import { LichSuKhamChiTietChiDinhModule } from './lich-su-kham-chi-tiet-chi-dinh/lich-su-kham-chi-tiet-chi-dinh.module';
import { LichSuKhamChiTietKeToaModule } from './lich-su-kham-chi-tiet-ke-toa/lich-su-kham-chi-tiet-ke-toa.module';
import { LichSuKhamChiTietLichSuKhamModule } from './lich-su-kham-chi-tiet-lich-su-kham/lich-su-kham-chi-tiet-lich-su-kham.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    FlexLayoutModule,
    NgScrollbarModule,
    LichSuKhamChiTietThongTinHanhChinhModule,
    LichSuKhamChiTietKhamBenhModule,
    LichSuKhamChiTietChiDinhModule,
    LichSuKhamChiTietKeToaModule,
    LichSuKhamChiTietLichSuKhamModule
  ],
  exports:[LichSuKhamChiTietComponent],
  declarations: [LichSuKhamChiTietComponent]
})
export class LichSuKhamChiTietModule { }
