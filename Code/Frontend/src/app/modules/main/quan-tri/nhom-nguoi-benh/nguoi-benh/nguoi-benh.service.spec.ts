import { TestBed } from '@angular/core/testing';

import { NguoiBenhService } from './nguoi-benh.service';

describe('NguoiBenhService', () => {
  let service: NguoiBenhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NguoiBenhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
