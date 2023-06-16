import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VanBanChuyenMonComponent } from './van-ban-chuyen-mon.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { VanBanChuyenMonRoutingModule } from './van-ban-chuyen-mon-routing.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { VanBangChuyenMonService } from './van-bang-chuyen-mon.service';
import { BaseService } from 'src/app/core/services/base.service';
import { VanBangChuyenMonChiTietModule } from './van-bang-chuyen-mon-chi-tiet/van-bang-chuyen-mon-chi-tiet.module';

@NgModule({
  imports: [
    CommonModule,
    VanBanChuyenMonRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    VanBangChuyenMonChiTietModule
  ],
  declarations: [VanBanChuyenMonComponent]
  ,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    VanBangChuyenMonService,
    { provide:BaseService, useClass:VanBangChuyenMonService }
  ],
})
export class VanBanChuyenMonModule { }
