import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';

const angularModules = [
  BrowserModule,
  BrowserAnimationsModule,
];
const materialModules = [
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatButtonModule
];

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent
  ],
  imports: [
    angularModules,
    materialModules
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
