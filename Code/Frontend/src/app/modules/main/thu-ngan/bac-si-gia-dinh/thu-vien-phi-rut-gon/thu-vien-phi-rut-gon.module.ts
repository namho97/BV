import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThuVienPhiRutGonComponent } from './thu-vien-phi-rut-gon.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ThuVienPhiRutGonChiTietModule } from './thu-vien-phi-rut-gon-chi-tiet/thu-vien-phi-rut-gon-chi-tiet.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    ThuVienPhiRutGonChiTietModule
  ],
  exports:[ThuVienPhiRutGonComponent],
  declarations: [ThuVienPhiRutGonComponent]
})
export class ThuVienPhiRutGonModule { }
