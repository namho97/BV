import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NguoiBenhComponent } from './nguoi-benh.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NguoiBenhRoutingModule } from './nguoi-benh-routing.module';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { BaseService } from 'src/app/core/services/base.service';
import { NguoiBenhService } from './nguoi-benh.service';
import { NguoiBenhChiTietModule } from './nguoi-benh-chi-tiet/nguoi-benh-chi-tiet.module';

@NgModule({
  imports: [
    CommonModule,
    NguoiBenhRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    NguoiBenhChiTietModule
  ],
  declarations: [NguoiBenhComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    NguoiBenhService,
    { provide:BaseService, useClass:NguoiBenhService }
  ],
})
export class NguoiBenhModule { }
