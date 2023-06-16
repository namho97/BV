/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PhanQuyenNguoiDungService } from './phan-quyen-nguoi-dung.service';

describe('Service: PhanQuyenNguoiDung', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhanQuyenNguoiDungService]
    });
  });

  it('should ...', inject([PhanQuyenNguoiDungService], (service: PhanQuyenNguoiDungService) => {
    expect(service).toBeTruthy();
  }));
});
