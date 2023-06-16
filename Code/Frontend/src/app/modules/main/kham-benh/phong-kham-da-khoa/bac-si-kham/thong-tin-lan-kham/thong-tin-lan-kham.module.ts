import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThongTinLanKhamComponent } from './thong-tin-lan-kham.component';
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
  exports:[ThongTinLanKhamComponent],
  declarations: [ThongTinLanKhamComponent]
})
export class ThongTinLanKhamModule { }
