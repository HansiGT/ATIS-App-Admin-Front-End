import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentUtilizationComponent } from './current-utilization.component';

describe('CurrentUtilizationComponent', () => {
  let component: CurrentUtilizationComponent;
  let fixture: ComponentFixture<CurrentUtilizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentUtilizationComponent ]
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
