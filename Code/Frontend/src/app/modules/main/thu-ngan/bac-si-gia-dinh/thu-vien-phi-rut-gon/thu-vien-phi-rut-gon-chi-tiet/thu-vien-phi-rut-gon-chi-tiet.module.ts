import { ThuVienPhiChiTietModule } from './../../thu-vien-phi/thu-vien-phi-chi-tiet/thu-vien-phi-chi-tiet.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThuVienPhiRutGonChiTietComponent } from './thu-vien-phi-rut-gon-chi-tiet.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    NgScrollbarModule,
    ThuVienPhiChiTietModule
  ],
  exports:[ThuVienPhiRutGonChiTietComponent],
  declarations: [ThuVienPhiRutGonChiTietComponent]
})
export class ThuVienPhiRutGonChiTietModule { }
