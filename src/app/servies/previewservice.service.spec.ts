import { TestBed } from '@angular/core/testing';

import { PreviewserviceService } from './previewservice.service';

describe('PreviewserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreviewserviceService = TestBed.get(PreviewserviceService);
    expect(service).toBeTruthy();
  });
});
