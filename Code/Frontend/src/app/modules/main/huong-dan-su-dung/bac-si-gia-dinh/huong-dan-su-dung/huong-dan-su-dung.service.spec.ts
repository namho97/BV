import { TestBed } from '@angular/core/testing';

import { HuongDanSuDungService } from './huong-dan-su-dung.service';

describe('HuongDanSuDungService', () => {
  let service: HuongDanSuDungService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HuongDanSuDungService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
