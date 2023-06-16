import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoSoNhanVienComponent } from './ho-so-nhan-vien.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HoSoNhanVienRoutingModule } from './ho-so-nhan-vien-routing.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { BaseService } from 'src/app/core/services/base.service';
import { HoSoNhanVienService } from './ho-so-nhan-vien.service';
import { HoSoNhanVienChiTietModule } from './ho-so-nhan-vien-chi-tiet/ho-so-nhan-vien-chi-tiet.module';
import { HoSoNhanVienDoiMatKhauModule } from './ho-so-nhan-vien-doi-mat-khau/ho-so-nhan-vien-doi-mat-khau.module';

@NgModule({
  imports: [
    CommonModule,
    HoSoNhanVienRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    HoSoNhanVienChiTietModule,
    HoSoNhanVienDoiMatKhauModule
  ],
  declarations: [HoSoNhanVienComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    HoSoNhanVienService,
    { provide:BaseService, useClass:HoSoNhanVienService }
  ],
})
export class HoSoNhanVienModule { }
