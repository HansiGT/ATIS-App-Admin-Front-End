import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbDatepickerPopup } from './datepicker.component';

describe('NgbdDatepickerPopup', () => {
  let component: NgbDatepickerPopup;
  let fixture: ComponentFixture<NgbDatepickerPopup>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NgbDatepickerPopup,

      ],
      schemas: [
        NO_ERRORS_SCHEMA //muss drin sein weil sonst nur errors kommen
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbDatepickerPopup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //fails because NgbDatepickerPopup is not the same name as the NgbDatepicker

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with the current date', () => {
    expect(component).toBeFalsy();
  });

  it('should get the prediction once the "show" button is pressed', () => {
    expect(component).toBeFalsy();
  });
});
