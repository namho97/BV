import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhatThuocComponent } from './phat-thuoc.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PhatThuocRoutingModule } from './phat-thuoc-routing.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { BaseService } from 'src/app/core/services/base.service';
import { PhatThuocService } from './phat-thuoc.service';
import { InBaoCaoModule } from './in-bao-cao/in-bao-cao.module';

@NgModule({
  imports: [
    CommonModule,
    PhatThuocRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    InBaoCaoModule
  ],
  declarations: [PhatThuocComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    PhatThuocService,
    { provide:BaseService, useClass:PhatThuocService }
  ],
})
export class PhatThuocModule { }
