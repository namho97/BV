import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KhoComponent } from './kho.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { KhoRoutingModule } from './kho-routing.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { KhoService } from './kho.service';
import { BaseService } from 'src/app/core/services/base.service';
import { KhoChiTietModule } from './kho-chi-tiet/kho-chi-tiet.module';
@NgModule({
  imports: [
    CommonModule,
    KhoRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    KhoChiTietModule
  ],
  declarations: [KhoComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    KhoService,
    { provide:BaseService, useClass:KhoService }
  ],
})
export class KhoModule { }
