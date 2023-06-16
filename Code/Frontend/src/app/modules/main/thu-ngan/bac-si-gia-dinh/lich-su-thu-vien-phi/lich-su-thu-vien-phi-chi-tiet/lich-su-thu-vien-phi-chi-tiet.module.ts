import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LichSuThuVienPhiChiTietComponent } from './lich-su-thu-vien-phi-chi-tiet.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    NgScrollbarModule
  ],
  exports:[LichSuThuVienPhiChiTietComponent],
  declarations: [LichSuThuVienPhiChiTietComponent]
})
export class LichSuThuVienPhiChiTietModule { }
