import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpeningHoursComponent } from './opening-hours/opening-hours.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { LayoutEditorComponent } from './layout-editor/layout-editor.component';
import { ReservationComponent } from './reservation/reservation.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/front-page',
    pathMatch: 'full'
  },
  {
    path: 'front-page',
    component: FrontPageComponent
  },
  {
    path: 'opening-hours',
    component: OpeningHoursComponent
  },
  {
    path: 'layout-editor',
    component: LayoutEditorComponent
  },
  {
    path: 'reservation',
    component: ReservationComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
