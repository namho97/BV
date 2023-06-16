import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DichVuKyThuatChiTietComponent } from './dich-vu-ky-thuat-chi-tiet.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  exports:[DichVuKyThuatChiTietComponent],
  declarations: [DichVuKyThuatChiTietComponent]
})
export class DichVuKyThuatChiTietModule { }
