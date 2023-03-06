import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './pages/list/list.component';
import { UsersRouting } from './users-routing.module';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { ModalModule } from 'src/app/shared/modal/modal.module';

@NgModule({
  declarations: [ListComponent, NavbarComponent],
  imports: [CommonModule, UsersRouting, ModalModule],
})
export class UsersModule {}
