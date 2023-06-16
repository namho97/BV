import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DuongDungComponent } from './duong-dung.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DuongDungRoutingModule } from './duong-dung-routing.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { DuongDungService } from './duong-dung.service';
import { BaseService } from 'src/app/core/services/base.service';
import { DuongDungChiTietModule } from './duong-dung-chi-tiet/duong-dung-chi-tiet.module';

@NgModule({
  imports: [
    CommonModule,
    DuongDungRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    DuongDungChiTietModule
  ],
  declarations: [DuongDungComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    DuongDungService,
    { provide:BaseService, useClass:DuongDungService }
  ],
})
export class DuongDungModule { }
