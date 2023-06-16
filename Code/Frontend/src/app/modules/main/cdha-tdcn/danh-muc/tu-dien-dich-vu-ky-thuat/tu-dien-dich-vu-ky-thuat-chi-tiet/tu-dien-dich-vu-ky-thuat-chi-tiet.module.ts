import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuDienDichVuKyThuatChiTietComponent } from './tu-dien-dich-vu-ky-thuat-chi-tiet.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [TuDienDichVuKyThuatChiTietComponent],
  declarations: [TuDienDichVuKyThuatChiTietComponent]
})
export class TuDienDichVuKyThuatChiTietModule { }
