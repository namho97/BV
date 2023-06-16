import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonViTinhComponent } from './don-vi-tinh.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DonViTinhRoutingModule } from './don-vi-tinh-routing.module';
import { DonViTinhChiTietModule } from './don-vi-tinh-chi-tiet/don-vi-tinh-chi-tiet.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { DonViTinhService } from './don-vi-tinh.service';
import { BaseService } from 'src/app/core/services/base.service';

@NgModule({
  imports: [
    CommonModule,
    DonViTinhRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    DonViTinhChiTietModule
  ],
  declarations: [DonViTinhComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    DonViTinhService,
    { provide:BaseService, useClass:DonViTinhService }
  ],
})
export class DonViTinhModule { }
