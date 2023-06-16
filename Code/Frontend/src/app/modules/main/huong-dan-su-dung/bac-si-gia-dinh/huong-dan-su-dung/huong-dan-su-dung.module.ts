import { HuongDanSuDungChiTietModule } from './huong-dan-su-dung-chi-tiet/huong-dan-su-dung-chi-tiet.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HuongDanSuDungComponent } from './huong-dan-su-dung.component';
import { HuongDanSuDungRoutingModule } from '../huong-dan-su-dung-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { HuongDanSuDungService } from './huong-dan-su-dung.service';
import { BaseService } from 'src/app/core/services/base.service';

@NgModule({
  imports: [
    CommonModule,
    HuongDanSuDungRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    HuongDanSuDungChiTietModule
  ],
  declarations: [HuongDanSuDungComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    HuongDanSuDungService,
    { provide:BaseService, useClass:HuongDanSuDungService }
  ],
})
export class HuongDanSuDungModule { }
