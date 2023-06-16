import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViTriDeDuocPhamVatTuChiTietComponent } from './vi-tri-de-duoc-pham-vat-tu-chi-tiet.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule,
    NgScrollbarModule
  ],
  exports:[ViTriDeDuocPhamVatTuChiTietComponent],
  declarations: [ViTriDeDuocPhamVatTuChiTietComponent]
})
export class ViTriDeDuocPhamVatTuChiTietModule { }
