import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TinhTrangKhamChiTietComponent } from './tinh-trang-kham-chi-tiet.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    FlexLayoutModule
  ],
  exports:[TinhTrangKhamChiTietComponent],
  declarations: [TinhTrangKhamChiTietComponent]
})
export class TinhTrangKhamChiTietModule { }
