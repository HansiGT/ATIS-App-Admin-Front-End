import { TestBed, inject } from '@angular/core/testing';

import { OpeningHoursService } from './opening-hours.service';

import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('OpeningHoursService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpeningHoursService],
      schemas: [
        NO_ERRORS_SCHEMA //muss drin sein weil sonst nur errors kommen
      ]
    });
  });

  it('should be created', inject([OpeningHoursService], (service: OpeningHoursService) => {
    expect(service).toBeTruthy();
  }));
});
