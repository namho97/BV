import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChucVuComponent } from './chuc-vu.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChucVuRoutingModule } from './chuc-vu-routing.module';
import { ChucVuChiTietModule } from './chuc-vu-chi-tiet/chuc-vu-chi-tiet.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ChucVuService } from './chuc-vu.service';
import { BaseService } from 'src/app/core/services/base.service';

@NgModule({
  imports: [
    CommonModule,
    ChucVuRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    ChucVuChiTietModule
  ],
  declarations: [ChucVuComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    ChucVuService,
    { provide:BaseService, useClass:ChucVuService }
  ],
})
export class ChucVuModule { }
