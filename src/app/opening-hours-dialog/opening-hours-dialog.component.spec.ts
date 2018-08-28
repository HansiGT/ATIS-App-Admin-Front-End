import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { OpeningHoursDialogComponent } from './opening-hours-dialog.component';

describe('OpeningHoursDialogComponent', () => {
  let component: OpeningHoursDialogComponent;
  let fixture: ComponentFixture<OpeningHoursDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpeningHoursDialogComponent ],
      schemas: [
        NO_ERRORS_SCHEMA //muss drin sein weil sonst nur errors kommen
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningHoursDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have one option for each day of the week', () => {
    expect(component).toBeFalsy();
  });

  it('should have one field for the start and one for the end', () => {
    expect(component).toBeFalsy();
  });

  it('should save the changes if the "save" button is pressed', () => {
    expect(component).toBeFalsy();
  });
});
