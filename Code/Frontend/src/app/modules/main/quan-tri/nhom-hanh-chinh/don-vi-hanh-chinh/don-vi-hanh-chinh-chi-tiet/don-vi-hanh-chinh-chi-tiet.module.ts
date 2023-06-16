import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonViHanhChinhChiTietComponent } from './don-vi-hanh-chinh-chi-tiet.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    NgScrollbarModule
  ],
  exports:[DonViHanhChinhChiTietComponent],
  declarations: [DonViHanhChinhChiTietComponent]
})
export class DonViHanhChinhChiTietModule { }
