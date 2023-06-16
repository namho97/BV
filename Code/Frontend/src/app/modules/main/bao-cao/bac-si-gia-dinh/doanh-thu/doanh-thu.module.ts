import { InBaoCaoModule } from './in-bao-cao/in-bao-cao.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoanhThuComponent } from './doanh-thu.component';
import { DoanhThuRoutingModule } from './doanh-thu-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { BaseService } from 'src/app/core/services/base.service';
import { DoanhThuService } from './doanh-thu.service';

@NgModule({
  imports: [
    CommonModule,
    DoanhThuRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    InBaoCaoModule
  ],
  declarations: [DoanhThuComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    DoanhThuService,
    { provide:BaseService, useClass:DoanhThuService }
  ],
})
export class DoanhThuModule { }
