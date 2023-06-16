import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BenhVienChiTietComponent } from './benh-vien-chi-tiet.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  exports:[BenhVienChiTietComponent],
  declarations: [BenhVienChiTietComponent]
})
export class BenhVienChiTietModule { }
