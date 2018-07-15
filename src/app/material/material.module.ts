import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatExpansionModule,
  MatInputModule,
  MatListModule,
  MatCardModule,
  MatSelectModule,
  MatGridListModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { FormsModule } from '@angular/forms';
import 'hammerjs';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatSelectModule,
    MatGridListModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  exports:[
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatSelectModule,
    MatGridListModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  declarations: []
})
export class MaterialModule { }
