import { TestBed } from '@angular/core/testing';

import { KhoaPhongService } from './khoa-phong.service';

describe('KhoaPhongService', () => {
  let service: KhoaPhongService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KhoaPhongService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
