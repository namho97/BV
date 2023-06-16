import { TestBed } from '@angular/core/testing';

import { DichVuKhamService } from './dich-vu-kham.service';

describe('DichVuKhamService', () => {
  let service: DichVuKhamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DichVuKhamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
