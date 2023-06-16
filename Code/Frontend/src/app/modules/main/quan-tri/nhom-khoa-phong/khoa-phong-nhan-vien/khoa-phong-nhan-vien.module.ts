import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KhoaPhongNhanVienComponent } from './khoa-phong-nhan-vien.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { KhoaPhongNhanVienRoutingModule } from './khoa-phong-nhan-vien-routing.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { KhoaPhongNhanVienService } from './khoa-phong-nhan-vien.service';
import { BaseService } from 'src/app/core/services/base.service';
import { KhoaPhongNhanVienChiTietModule } from './khoa-phong-nhan-vien-chi-tiet/khoa-phong-nhan-vien-chi-tiet.module';

@NgModule({
  imports: [
    CommonModule,
    KhoaPhongNhanVienRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    KhoaPhongNhanVienChiTietModule
  ],
  declarations: [KhoaPhongNhanVienComponent]
  ,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    KhoaPhongNhanVienService,
    { provide:BaseService, useClass:KhoaPhongNhanVienService }
  ],
})
export class KhoaPhongNhanVienModule { }
