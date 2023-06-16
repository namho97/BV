import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhanQuyenNguoiDungComponent } from './phan-quyen-nguoi-dung.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PhanQuyenNguoiDungRoutingModule } from './phan-quyen-nguoi-dung-routing.module';
import { PhanQuyenNguoiDungChiTietModule } from './phan-quyen-nguoi-dung-chi-tiet/phan-quyen-nguoi-dung-chi-tiet.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { BaseService } from 'src/app/core/services/base.service';
import { PhanQuyenNguoiDungService } from './phan-quyen-nguoi-dung.service';

@NgModule({
  imports: [
    CommonModule,
    PhanQuyenNguoiDungRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    PhanQuyenNguoiDungChiTietModule
  ],
  declarations: [PhanQuyenNguoiDungComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    PhanQuyenNguoiDungService,
    { provide:BaseService, useClass:PhanQuyenNguoiDungService }
  ],
})
export class PhanQuyenNguoiDungModule { }
