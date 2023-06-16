import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KhamBenhComponent } from './kham-benh.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { KhamBenhRoutingModule } from './kham-benh-routing.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { BaseService } from 'src/app/core/services/base.service';
import { KhamBenhService } from './kham-benh.service';
import { InBaoCaoModule } from './in-bao-cao/in-bao-cao.module';

@NgModule({
  imports: [
    CommonModule,
    KhamBenhRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    InBaoCaoModule
  ],
  declarations: [KhamBenhComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    KhamBenhService,
    { provide:BaseService, useClass:KhamBenhService }
  ],
})
export class KhamBenhModule { }
