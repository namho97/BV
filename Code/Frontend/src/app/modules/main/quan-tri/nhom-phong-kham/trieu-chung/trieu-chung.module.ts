import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrieuChungComponent } from './trieu-chung.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TrieuChungRoutingModule } from './trieu-chung-routing.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { TrieuChungService } from './trieu-chung.service';
import { BaseService } from 'src/app/core/services/base.service';
import { TrieuChungChiTietModule } from './trieu-chung-chi-tiet/trieu-chung-chi-tiet.module';

@NgModule({
  imports: [
    CommonModule,
    TrieuChungRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    TrieuChungChiTietModule
  ],
  declarations: [TrieuChungComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    TrieuChungService,
    { provide:BaseService, useClass:TrieuChungService }
  ],
})
export class TrieuChungModule { }
