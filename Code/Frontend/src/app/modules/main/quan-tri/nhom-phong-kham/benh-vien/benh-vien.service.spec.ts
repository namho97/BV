/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BenhVienService } from './benh-vien.service';

describe('Service: BenhVien', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BenhVienService]
    });
  });

  it('should ...', inject([BenhVienService], (service: BenhVienService) => {
    expect(service).toBeTruthy();
  }));
});
