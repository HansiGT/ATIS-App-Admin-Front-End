import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdElementDialogComponent } from './id-element-dialog.component';

describe('IdElementDialogComponent', () => {
  let component: IdElementDialogComponent;
  let fixture: ComponentFixture<IdElementDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdElementDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdElementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
