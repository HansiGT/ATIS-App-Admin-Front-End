import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningHoursDialogComponent } from './opening-hours-dialog.component';

describe('OpeningHoursDialogComponent', () => {
  let component: OpeningHoursDialogComponent;
  let fixture: ComponentFixture<OpeningHoursDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpeningHoursDialogComponent ]
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
});
