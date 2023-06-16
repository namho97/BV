import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThuVienPhiComponent } from './thu-vien-phi.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ThuVienPhiRoutingModule } from './thu-vien-phi-routing.module';
import { ThuVienPhiChiTietModule } from './thu-vien-phi-chi-tiet/thu-vien-phi-chi-tiet.module';

@NgModule({
  imports: [
    CommonModule,
    ThuVienPhiRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    ThuVienPhiChiTietModule
  ],
  declarations: [ThuVienPhiComponent]
})
export class ThuVienPhiModule { }
