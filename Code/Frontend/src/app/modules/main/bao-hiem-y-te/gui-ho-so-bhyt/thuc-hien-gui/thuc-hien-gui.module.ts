import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThucHienGuiComponent } from './thuc-hien-gui.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ThucHienGuiRoutingModule } from './thuc-hien-gui-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ThucHienGuiRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [ThucHienGuiComponent]
})
export class ThucHienGuiModule { }
