import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThucHienXacNhanComponent } from './thuc-hien-xac-nhan.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ThucHienXacNhanRoutingModule } from './thuc-hien-xac-nhan-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ThucHienXacNhanRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [ThucHienXacNhanComponent]
})
export class ThucHienXacNhanModule { }
