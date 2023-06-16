import { TestBed } from '@angular/core/testing';

import { ChucVuService } from './chuc-vu.service';

describe('ChucVuService', () => {
  let service: ChucVuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChucVuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
