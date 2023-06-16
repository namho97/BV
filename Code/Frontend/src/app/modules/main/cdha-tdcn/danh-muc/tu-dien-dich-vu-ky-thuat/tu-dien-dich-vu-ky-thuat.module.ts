import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuDienDichVuKyThuatComponent } from './tu-dien-dich-vu-ky-thuat.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TuDienDichVuKyThuatRoutingModule } from './tu-dien-dich-vu-ky-thuat-routing.module';
import { TuDienDichVuKyThuatChiTietModule } from './tu-dien-dich-vu-ky-thuat-chi-tiet/tu-dien-dich-vu-ky-thuat-chi-tiet.module';

@NgModule({
  imports: [
    CommonModule,
    TuDienDichVuKyThuatRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    TuDienDichVuKyThuatChiTietModule
  ],
  declarations: [TuDienDichVuKyThuatComponent]
})
export class TuDienDichVuKyThuatModule { }
