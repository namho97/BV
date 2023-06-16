import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HuongDanSuDungComponent } from './huong-dan-su-dung.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HuongDanSuDungRoutingModule } from './huong-dan-su-dung-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HuongDanSuDungRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [HuongDanSuDungComponent]
})
export class HuongDanSuDungModule { }
