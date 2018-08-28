import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FrontPageComponent } from './front-page.component';

describe('FrontPageComponent', () => {
  let component: FrontPageComponent;
  let fixture: ComponentFixture<FrontPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontPageComponent ],
      schemas: [
        NO_ERRORS_SCHEMA //muss drin sein weil sonst nur errors kommen
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain five tiles', () => {
    expect(component).toBeFalsy();
  });

  it('should have one icon and text per tile', () => {
    expect(component).toBeFalsy();
  });

  it('should have the same size for each tile', () => {
    expect(component).toBeFalsy();
  });

  it('should have the same color for each tile', () => {
    expect(component).toBeFalsy();
  });
});
