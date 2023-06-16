import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiepNhanNguoiBenhKhamComponent } from './tiep-nhan-nguoi-benh-kham.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TiepNhanNguoiBenhKhamRoutingModule } from './tiep-nhan-nguoi-benh-kham-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TiepNhanNguoiBenhKhamRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [TiepNhanNguoiBenhKhamComponent]
})
export class TiepNhanNguoiBenhKhamModule { }
