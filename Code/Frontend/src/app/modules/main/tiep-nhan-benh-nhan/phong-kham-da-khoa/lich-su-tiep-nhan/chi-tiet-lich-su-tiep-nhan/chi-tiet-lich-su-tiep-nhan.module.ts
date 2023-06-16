import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChiTietLichSuTiepNhanComponent } from './chi-tiet-lich-su-tiep-nhan.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    FlexLayoutModule,
    NgScrollbarModule
  ],
  exports:[ChiTietLichSuTiepNhanComponent],
  declarations: [ChiTietLichSuTiepNhanComponent]
})
export class ChiTietLichSuTiepNhanModule { }
