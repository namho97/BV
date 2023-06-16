import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThuVienPhiChiTietComponent } from './thu-vien-phi-chi-tiet.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports:[ThuVienPhiChiTietComponent],
  declarations: [ThuVienPhiChiTietComponent]
})
export class ThuVienPhiChiTietModule { }
