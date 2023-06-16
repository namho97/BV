import { TestBed } from '@angular/core/testing';

import { NhaSanXuatService } from './nha-san-xuat.service';

describe('NhaSanXuatService', () => {
  let service: NhaSanXuatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NhaSanXuatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
