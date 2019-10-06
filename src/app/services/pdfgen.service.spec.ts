import { TestBed } from '@angular/core/testing';

import { PdfgenService } from './pdfgen.service';

describe('PdfgenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PdfgenService = TestBed.get(PdfgenService);
    expect(service).toBeTruthy();
  });
});
