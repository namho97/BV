import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KhamBenhComponent } from './kham-benh.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { KhamBenhRoutingModule } from './kham-benh-routing.module';

@NgModule({
  imports: [
    CommonModule,
    KhamBenhRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [KhamBenhComponent]
})
export class KhamBenhModule { }
