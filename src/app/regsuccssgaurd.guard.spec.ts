import { TestBed, async, inject } from '@angular/core/testing';

import { RegsuccssgaurdGuard } from './regsuccssgaurd.guard';

describe('RegsuccssgaurdGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegsuccssgaurdGuard]
    });
  });

  it('should ...', inject([RegsuccssgaurdGuard], (guard: RegsuccssgaurdGuard) => {
    expect(guard).toBeTruthy();
  }));
});
