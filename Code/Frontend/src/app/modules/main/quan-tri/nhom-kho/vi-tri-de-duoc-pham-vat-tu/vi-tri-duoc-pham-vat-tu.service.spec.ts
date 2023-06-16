import { TestBed } from '@angular/core/testing';

import { ViTriDuocPhamVatTuService } from './vi-tri-duoc-pham-vat-tu.service';

describe('ViTriDuocPhamVatTuService', () => {
  let service: ViTriDuocPhamVatTuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViTriDuocPhamVatTuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
