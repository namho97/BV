import { TestBed } from '@angular/core/testing';

import { ThongSoMacDinhService } from './thong-so-mac-dinh.service';

describe('ThongSoMacDinhService', () => {
  let service: ThongSoMacDinhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThongSoMacDinhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
