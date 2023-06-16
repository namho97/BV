import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToaThuocMauComponent } from './toa-thuoc-mau.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToaThuocMauRoutingModule } from './toa-thuoc-mau-routing.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ToaThuocMauService } from './toa-thuoc-mau.service';
import { BaseService } from 'src/app/core/services/base.service';
import { ToaThuocMauChiTietModule } from './toa-thuoc-mau-chi-tiet/toa-thuoc-mau-chi-tiet.module';

@NgModule({
  imports: [
    CommonModule,
    ToaThuocMauRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    ToaThuocMauChiTietModule
  ],
  declarations: [ToaThuocMauComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    ToaThuocMauService,
    { provide:BaseService, useClass:ToaThuocMauService }
  ]
})
export class ToaThuocMauModule { }
