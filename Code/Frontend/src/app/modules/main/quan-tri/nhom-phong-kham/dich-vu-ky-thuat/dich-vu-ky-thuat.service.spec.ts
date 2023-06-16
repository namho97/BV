import { TestBed } from '@angular/core/testing';

import { DichVuKyThuatService } from './dich-vu-ky-thuat.service';

describe('DichVuKyThuatService', () => {
  let service: DichVuKyThuatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DichVuKyThuatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
