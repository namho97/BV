import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NguoiBenhDangKhamKeToaComponent } from './nguoi-benh-dang-kham-ke-toa.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LuuToaMauMoiModule } from './luu-toa-mau-moi/luu-toa-mau-moi.module';
import { DuocPhamChiTietModule } from 'src/app/modules/main/quan-tri/nhom-duoc-pham/duoc-pham/duoc-pham-chi-tiet/duoc-pham-chi-tiet.module';
import { IcdChiTietModule } from 'src/app/modules/main/quan-tri/nhom-phong-kham/icd/icd-chi-tiet/icd-chi-tiet.module';
import { BenhVienChiTietModule } from 'src/app/modules/main/quan-tri/nhom-phong-kham/benh-vien/benh-vien-chi-tiet/benh-vien-chi-tiet.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    FlexLayoutModule,
    NgScrollbarModule,
    LuuToaMauMoiModule,
    DuocPhamChiTietModule,
    IcdChiTietModule,
    BenhVienChiTietModule
  ],
  exports:[NguoiBenhDangKhamKeToaComponent],
  declarations: [NguoiBenhDangKhamKeToaComponent]
})
export class NguoiBenhDangKhamKeToaModule { }
