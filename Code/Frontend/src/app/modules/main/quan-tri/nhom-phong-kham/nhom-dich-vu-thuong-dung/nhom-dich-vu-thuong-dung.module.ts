import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NhomDichVuThuongDungComponent } from './nhom-dich-vu-thuong-dung.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NhomDichVuThuongDungRoutingModule } from './nhom-dich-vu-thuong-dung-routing.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { NhomDichVuThuongDungService } from './nhom-dich-vu-thuong-dung.service';
import { BaseService } from 'src/app/core/services/base.service';
import { NhomDichVuThuongDungChiTietModule } from './nhom-dich-vu-thuong-dung-chi-tiet/nhom-dich-vu-thuong-dung-chi-tiet.module';

@NgModule({
  imports: [
    CommonModule,
    NhomDichVuThuongDungRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    NhomDichVuThuongDungChiTietModule
  ],
  declarations: [NhomDichVuThuongDungComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    NhomDichVuThuongDungService,
    { provide:BaseService, useClass:NhomDichVuThuongDungService }
  ]
})
export class NhomDichVuThuongDungModule { }
