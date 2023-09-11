import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AddUserComponent } from './table-list/add-user/add-user.component';
import { DeleteUserComponent } from './table-list/delete-user/delete-user.component';
import { MaterialModule } from './material/material.module';
import { EditUserComponent } from './table-list/edit-user/edit-user.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MaterialModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AddUserComponent,
    DeleteUserComponent,
    EditUserComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
