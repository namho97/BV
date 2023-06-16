import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IcdComponent } from './icd.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { IcdRoutingModule } from './icd-routing.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { BaseService } from 'src/app/core/services/base.service';
import { IcdService } from './icd.service';
import { IcdChiTietModule } from './icd-chi-tiet/icd-chi-tiet.module';

@NgModule({
  imports: [
    CommonModule,
    IcdRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    IcdChiTietModule
  ],
  declarations: [IcdComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    IcdService,
    { provide:BaseService, useClass:IcdService }
  ]
})
export class IcdModule { }
