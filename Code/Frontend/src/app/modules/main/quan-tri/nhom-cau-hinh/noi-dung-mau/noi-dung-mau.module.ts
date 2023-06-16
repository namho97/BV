import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoiDungMauComponent } from './noi-dung-mau.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BaseService } from 'src/app/core/services/base.service';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NoiDungMauChiTietModule } from './noi-dung-mau-chi-tiet/noi-dung-mau-chi-tiet.module';
import { NoiDungMauRoutingModule } from './noi-dung-mau-routing.module';
import { NoiDungMauService } from './noi-dung-mau.service';

@NgModule({
  imports: [
    CommonModule,
    NoiDungMauRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    NoiDungMauChiTietModule
  ],
  declarations: [NoiDungMauComponent],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    NoiDungMauService,
    { provide:BaseService, useClass:NoiDungMauService }
  ]
})
export class NoiDungMauModule { }
