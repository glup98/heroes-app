import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { MaterialModule } from '../material/material.module';

import { LayoutComponent } from './layouts/layout.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { CardComponent } from './components/card/card.component';

import { HeroImgPipe } from './pipes/hero-img.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/dialogs/comfirn-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    CardComponent,
    HeroPageComponent,
    LayoutComponent,
    ListPageComponent,
    NewPageComponent,
    SearchPageComponent,
    HeroImgPipe,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class HeroesModule {}
