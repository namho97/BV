import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NguoiBenhChiTietComponent } from './nguoi-benh-chi-tiet.component';
import { DonViHanhChinhChiTietModule } from '../../../nhom-hanh-chinh/don-vi-hanh-chinh/don-vi-hanh-chinh-chi-tiet/don-vi-hanh-chinh-chi-tiet.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    NgScrollbarModule,
    DonViHanhChinhChiTietModule
  ],
  exports:[NguoiBenhChiTietComponent],
  declarations: [NguoiBenhChiTietComponent]
})
export class NguoiBenhChiTietModule { }
