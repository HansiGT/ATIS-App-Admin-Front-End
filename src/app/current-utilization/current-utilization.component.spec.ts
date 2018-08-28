import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CurrentUtilizationComponent } from './current-utilization.component';

describe('CurrentUtilizationComponent', () => {
  let component: CurrentUtilizationComponent;
  let fixture: ComponentFixture<CurrentUtilizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentUtilizationComponent ],
      schemas: [
        NO_ERRORS_SCHEMA //muss drin sein weil sonst nur errors kommen
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentUtilizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
