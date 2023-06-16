import { NhomDichVuThuongDungModule } from './../nhom-dich-vu-thuong-dung/nhom-dich-vu-thuong-dung.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NguoiBenhDangKhamChiDinhComponent } from './nguoi-benh-dang-kham-chi-dinh.component';
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
    NgScrollbarModule,
    NhomDichVuThuongDungModule
  ],
  exports:[NguoiBenhDangKhamChiDinhComponent],
  declarations: [NguoiBenhDangKhamChiDinhComponent]
})
export class NguoiBenhDangKhamChiDinhModule { }
