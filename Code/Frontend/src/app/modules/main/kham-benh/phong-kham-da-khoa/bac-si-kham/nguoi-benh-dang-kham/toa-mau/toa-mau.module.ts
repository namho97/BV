import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToaMauComponent } from './toa-mau.component';
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
  exports:[ToaMauComponent],
  declarations: [ToaMauComponent]
})
export class ToaMauModule { }
