import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuanHeThanNhanComponent } from './quan-he-than-nhan.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuanHeThanNhanRoutingModule } from './quan-he-than-nhan-routing.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { QuanHeThanNhanService } from './quan-he-than-nhan.service';
import { BaseService } from 'src/app/core/services/base.service';
import { QuanHeThanNhanChiTietModule } from './quan-he-than-nhan-chi-tiet/quan-he-than-nhan-chi-tiet.module';

@NgModule({
  imports: [
    CommonModule,
    QuanHeThanNhanRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    QuanHeThanNhanChiTietModule
  ],
  declarations: [QuanHeThanNhanComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    QuanHeThanNhanService,
    { provide:BaseService, useClass:QuanHeThanNhanService }
  ],
})
export class QuanHeThanNhanModule { }
