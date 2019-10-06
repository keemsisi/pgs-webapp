import { TestBed, async, inject } from '@angular/core/testing';

import { AdminLoginGaurdGuard } from './admin-login-gaurd.guard';

describe('AdminLoginGaurdGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminLoginGaurdGuard]
    });
  });

  it('should ...', inject([AdminLoginGaurdGuard], (guard: AdminLoginGaurdGuard) => {
    expect(guard).toBeTruthy();
  }));
});
