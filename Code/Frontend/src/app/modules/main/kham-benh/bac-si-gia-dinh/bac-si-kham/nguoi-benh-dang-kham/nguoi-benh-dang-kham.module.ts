import { NgScrollbarModule } from 'ngx-scrollbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NguoiBenhDangKhamComponent } from './nguoi-benh-dang-kham.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NguoiBenhDangKhamKhamBenhModule } from './nguoi-benh-dang-kham-kham-benh/nguoi-benh-dang-kham-kham-benh.module';
import { NguoiBenhDangKhamLichSuKhamModule } from './nguoi-benh-dang-kham-lich-su-kham/nguoi-benh-dang-kham-lich-su-kham.module';
import { NguoiBenhDangKhamKeToaModule } from './nguoi-benh-dang-kham-ke-toa/nguoi-benh-dang-kham-ke-toa.module';
import { NguoiBenhDangKhamThongTinHanhChinhModule } from './nguoi-benh-dang-kham-thong-tin-hanh-chinh/nguoi-benh-dang-kham-thong-tin-hanh-chinh.module';
import { ToaMauModule } from './toa-mau/toa-mau.module';
import { ThuVienPhiRutGonModule } from 'src/app/modules/main/thu-ngan/bac-si-gia-dinh/thu-vien-phi-rut-gon/thu-vien-phi-rut-gon.module';
import { NguoiBenhDangKhamTiepTheoModule } from './nguoi-benh-dang-kham-tiep-theo/nguoi-benh-dang-kham-tiep-theo.module';
import { NguoiBenhDangKhamChiDinhModule } from './nguoi-benh-dang-kham-chi-dinh/nguoi-benh-dang-kham-chi-dinh.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    FlexLayoutModule,
    NgScrollbarModule,
    NguoiBenhDangKhamThongTinHanhChinhModule,
    NguoiBenhDangKhamKhamBenhModule,
    NguoiBenhDangKhamLichSuKhamModule,
    NguoiBenhDangKhamKeToaModule,
    ToaMauModule,
    ThuVienPhiRutGonModule,
    NguoiBenhDangKhamTiepTheoModule,
    NguoiBenhDangKhamChiDinhModule
  ],
  exports:[NguoiBenhDangKhamComponent],
  declarations: [NguoiBenhDangKhamComponent]
})
export class NguoiBenhDangKhamModule { }
