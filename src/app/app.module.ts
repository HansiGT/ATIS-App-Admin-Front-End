import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OpeningHoursService } from './opening-hours.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule, } from '@angular/material';
import { AppRoutingModule } from './/app-routing.module';
import { OpeningHoursComponent } from './opening-hours/opening-hours.component';
import { FrontPageComponent } from './front-page/front-page.component';
import { LayoutEditorComponent } from './layout-editor/layout-editor.component';
import { DraggableModule } from './draggable/draggable.module';
import { OpeningHoursDialogComponent } from './opening-hours-dialog/opening-hours-dialog.component';
import { InterceptorModule } from './interceptor.module';
import { IdElementDialogComponent } from './id-element-dialog/id-element-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    OpeningHoursComponent,
    FrontPageComponent,
    LayoutEditorComponent,
    OpeningHoursDialogComponent,
    IdElementDialogComponent
  ],
  imports: [
    NgbModule.forRoot(),
    NgxMaterialTimepickerModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InterceptorModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatGridListModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    AppRoutingModule,
    DraggableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  entryComponents: [
    OpeningHoursDialogComponent,
    IdElementDialogComponent
  ],
  providers: [OpeningHoursService],
  bootstrap: [AppComponent]
})
export class AppModule { }
