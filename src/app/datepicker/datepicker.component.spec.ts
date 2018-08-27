import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbdDatepickerPopup } from './datepicker.component';

describe('NgbdDatepickerPopup', () => {
  let component: NgbdDatepickerPopup;
  let fixture: ComponentFixture<NgbdDatepickerPopup>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NgbdDatepickerPopup
      ],
      schemas: [
        NO_ERRORS_SCHEMA //muss drin sein weil sonst nur errors kommen
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbdDatepickerPopup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NgbdDatepickerPopup);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
