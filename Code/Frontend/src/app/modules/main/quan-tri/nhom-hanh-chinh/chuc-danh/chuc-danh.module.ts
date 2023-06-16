import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChucDanhComponent } from './chuc-danh.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChucDanhRoutingModule } from './chuc-danh-routing.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { BaseService } from 'src/app/core/services/base.service';
import { ChucDanhService } from '../chuc-danh/chuc-danh.service';
import { ChucDanhChiTietModule } from './chuc-danh-chi-tiet/chuc-danh-chi-tiet.module';
@NgModule({
  imports: [
    CommonModule,
    ChucDanhRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    ChucDanhChiTietModule
  ],
  declarations: [ChucDanhComponent]
  ,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    ChucDanhService,
    { provide:BaseService, useClass:ChucDanhService }
  ],
})
export class ChucDanhModule { }
