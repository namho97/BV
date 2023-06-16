import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LichSuKhamChiTietThongTinHanhChinhComponent } from './lich-su-kham-chi-tiet-thong-tin-hanh-chinh.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    FlexLayoutModule,
    NgScrollbarModule
  ],
  exports:[LichSuKhamChiTietThongTinHanhChinhComponent],
  declarations: [LichSuKhamChiTietThongTinHanhChinhComponent]
})
export class LichSuKhamChiTietThongTinHanhChinhModule { }
