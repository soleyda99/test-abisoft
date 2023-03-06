import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from './modal/modal.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ModalModule],
  exports: [NavbarComponent],
})
export class SharedModule {}
