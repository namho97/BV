import { TestBed } from '@angular/core/testing';

import { ToaThuocMauService } from './toa-thuoc-mau.service';

describe('ToaThuocMauService', () => {
  let service: ToaThuocMauService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToaThuocMauService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
