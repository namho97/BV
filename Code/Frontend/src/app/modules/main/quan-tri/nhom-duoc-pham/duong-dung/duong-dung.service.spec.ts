import { TestBed } from '@angular/core/testing';

import { DuongDungService } from './duong-dung.service';

describe('DuongDungService', () => {
  let service: DuongDungService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DuongDungService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
