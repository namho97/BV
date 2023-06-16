import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NhaCungCapComponent } from './nha-cung-cap.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NhaCungCapRoutingModule } from './nha-cung-cap-routing.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { NhaCungCapService } from './nha-cung-cap.service';
import { BaseService } from 'src/app/core/services/base.service';
import { NhaCungCapChiTietModule } from './nha-cung-cap-chi-tiet/nha-cung-cap-chi-tiet.module';

@NgModule({
  imports: [
    CommonModule,
    NhaCungCapRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    NhaCungCapChiTietModule
  ],
  declarations: [NhaCungCapComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    NhaCungCapService,
    { provide:BaseService, useClass:NhaCungCapService }
  ],
})
export class NhaCungCapModule { }
