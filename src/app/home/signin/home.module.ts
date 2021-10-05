import { NgModule } from '@angular/core';
import { SignInComponent } from './signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ SignInComponent ],  //escopod de página, por isso não precisou ter um declarations
  imports: [
    CommonModule,
    ReactiveFormsModule ]

})

export class HomeModule{}
