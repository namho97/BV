import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InBaoCaoComponent } from './in-bao-cao.component';
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
  exports:[InBaoCaoComponent],
  declarations: [InBaoCaoComponent]
})
export class InBaoCaoModule { }
