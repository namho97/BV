import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapCodeComponent } from './cap-code.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CapCodeRoutingModule } from './cap-code-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CapCodeRoutingModule,
    SharedModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [CapCodeComponent]
})
export class CapCodeModule { }
