import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { InBaoCaoHenKhamComponent } from './in-bao-cao-hen-kham.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    FlexLayoutModule
  ],
  exports:[InBaoCaoHenKhamComponent],
  declarations: [InBaoCaoHenKhamComponent]
})
export class InBaoCaoHenKhamModule { }
