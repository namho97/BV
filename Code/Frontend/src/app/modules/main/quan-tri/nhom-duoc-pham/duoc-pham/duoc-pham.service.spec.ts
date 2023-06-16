/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DuocPhamService } from './duoc-pham.service';

describe('Service: DuocPham', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DuocPhamService]
    });
  });

  it('should ...', inject([DuocPhamService], (service: DuocPhamService) => {
    expect(service).toBeTruthy();
  }));
});
