/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DoanhThuService } from './doanh-thu.service';

describe('Service: DoanhThu', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoanhThuService]
    });
  });

  it('should ...', inject([DoanhThuService], (service: DoanhThuService) => {
    expect(service).toBeTruthy();
  }));
});
