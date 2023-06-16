import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LichSuXacNhanComponent } from './lich-su-xac-nhan.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LichSuXacNhanRoutingModule } from './lich-su-xac-nhan-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LichSuXacNhanRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [LichSuXacNhanComponent]
})
export class LichSuXacNhanModule { }
