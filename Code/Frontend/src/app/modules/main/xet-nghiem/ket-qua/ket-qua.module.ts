import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KetQuaComponent } from './ket-qua.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { KetQuaRoutingModule } from './ket-qua-routing.module';

@NgModule({
  imports: [
    CommonModule,
    KetQuaRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [KetQuaComponent]
})
export class KetQuaModule { }
