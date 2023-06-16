import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NguoiBenhDangKhamThongTinHanhChinhComponent } from './nguoi-benh-dang-kham-thong-tin-hanh-chinh.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DangKyKhamChiTietModule } from 'src/app/modules/main/tiep-nhan-benh-nhan/bac-si-gia-dinh/dang-ky-kham/dang-ky-kham-chi-tiet/dang-ky-kham-chi-tiet.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    FlexLayoutModule,
    NgScrollbarModule,
    DangKyKhamChiTietModule
  ],
  exports:[NguoiBenhDangKhamThongTinHanhChinhComponent],
  declarations: [NguoiBenhDangKhamThongTinHanhChinhComponent]
})
export class NguoiBenhDangKhamThongTinHanhChinhModule { }
