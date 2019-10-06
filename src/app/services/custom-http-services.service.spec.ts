import { TestBed } from '@angular/core/testing';

import { CustomHttpServicesService } from './custom-http-services.service';

describe('CustomHttpServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomHttpServicesService = TestBed.get(CustomHttpServicesService);
    expect(service).toBeTruthy();
  });
});
