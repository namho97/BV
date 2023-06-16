import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaoTiepNhanComponent } from './tao-tiep-nhan.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TaoTiepNhanRoutingModule } from './tao-tiep-nhan-routing.module';
import { TaoTiepNhanSharedModule } from './tao-tiep-nhan-shared/tao-tiep-nhan-shared.module';

@NgModule({
  imports: [
    CommonModule,
    TaoTiepNhanRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    TaoTiepNhanSharedModule
  ],
  declarations: [TaoTiepNhanComponent]
})
export class TaoTiepNhanModule { }
