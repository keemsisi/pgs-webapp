import { TestBed } from '@angular/core/testing';

import { LoginCacheService } from './login-cache.service';

describe('LoginCacheService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginCacheService = TestBed.get(LoginCacheService);
    expect(service).toBeTruthy();
  });
});
