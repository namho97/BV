import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { MatListModule } from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatDividerModule,
    RouterModule    
  ],
  exports:[
    SidenavComponent
  ],
  declarations: [SidenavComponent]
})
export class SidenavModule { }
