import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DanTocComponent } from './dan-toc.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DanTocRoutingModule } from './dan-toc-routing.module';
import { DanTocChiTietModule } from './dan-toc-chi-tiet/dan-toc-chi-tiet.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { DanTocService } from './dan-toc.service';
import { BaseService } from 'src/app/core/services/base.service';

@NgModule({
  imports: [
    CommonModule,
    DanTocRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    DanTocChiTietModule
  ],
  declarations: [DanTocComponent]
  ,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    DanTocService,
    { provide:BaseService, useClass:DanTocService }
  ],
})
export class DanTocModule { }
