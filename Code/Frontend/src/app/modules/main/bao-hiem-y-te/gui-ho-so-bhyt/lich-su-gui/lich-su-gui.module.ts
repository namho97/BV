import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LichSuGuiComponent } from './lich-su-gui.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LichSuGuiRoutingModule } from './lich-su-gui-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LichSuGuiRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [LichSuGuiComponent]
})
export class LichSuGuiModule { }
