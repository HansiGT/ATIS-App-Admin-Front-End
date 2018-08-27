import { TestBed, inject } from '@angular/core/testing';

import { OpeningHoursService } from './opening-hours.service';

describe('OpeningHoursService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpeningHoursService]
    });
  });

  it('should be created', inject([OpeningHoursService], (service: OpeningHoursService) => {
    expect(service).toBeTruthy();
  }));
});
