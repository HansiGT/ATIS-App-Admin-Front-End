import { TestBed, inject } from '@angular/core/testing';

import { LayoutEditorService } from './layout-editor.service';

describe('LayoutEditorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LayoutEditorService]
    });
  });

  it('should be created', inject([LayoutEditorService], (service: LayoutEditorService) => {
    expect(service).toBeTruthy();
  }));
});
