import { TestBed } from '@angular/core/testing';

import { NhomVatTuService } from './nhom-vat-tu.service';

describe('NhomVatTuService', () => {
  let service: NhomVatTuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NhomVatTuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
