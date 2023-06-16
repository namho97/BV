import { TestBed } from '@angular/core/testing';

import { QuanHeThanNhanService } from './quan-he-than-nhan.service';

describe('QuanHeThanNhanService', () => {
  let service: QuanHeThanNhanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuanHeThanNhanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
