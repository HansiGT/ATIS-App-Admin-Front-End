import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OpeningHoursComponent } from './opening-hours.component';
import { OpeningHoursService } from '../opening-hours.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatDialog } from '@angular/material';

describe('OpeningHoursComponent', () => {
  let component: OpeningHoursComponent;
  let fixture: ComponentFixture<OpeningHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OpeningHoursComponent],
      schemas: [
        NO_ERRORS_SCHEMA //muss drin sein weil sonst nur errors kommen
      ],
      //providers: [OpeningHoursService, HttpClient, MatDialog]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should diplay the opening hours from monday to saturday', () => {
    expect(component).toBeFalsy();
  });

  it('should translate the weekdays into german', () => {
    expect(component).toBeFalsy();
  });

  it('should display a opening and a closing time for each day', () => {
    expect(component).toBeFalsy();
  });

  it('should open the editing dialog if i click on the "edit" button', () => {
    expect(component).toBeFalsy();
  });
});
