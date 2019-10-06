import { TestBed, async, inject } from '@angular/core/testing';

import { RegisterationGuard } from './registeration.guard';

describe('RegisterationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegisterationGuard]
    });
  });

  it('should ...', inject([RegisterationGuard], (guard: RegisterationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
