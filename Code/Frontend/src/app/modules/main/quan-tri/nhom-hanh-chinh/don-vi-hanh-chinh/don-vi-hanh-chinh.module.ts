import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonViHanhChinhComponent } from './don-vi-hanh-chinh.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BaseService } from 'src/app/core/services/base.service';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DonViHanhChinhChiTietModule } from './don-vi-hanh-chinh-chi-tiet/don-vi-hanh-chinh-chi-tiet.module';
import { DonViHanhChinhRoutingModule } from './don-vi-hanh-chinh-routing.module';
import { DonViHanhChinhService } from './don-vi-hanh-chinh.service';

@NgModule({
  imports: [
    CommonModule,
    DonViHanhChinhRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    DonViHanhChinhChiTietModule,
  ],
  declarations: [DonViHanhChinhComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    DonViHanhChinhService,
    { provide:BaseService, useClass:DonViHanhChinhService }
  ],
})
export class DonViHanhChinhModule { }
