import { TestBed } from '@angular/core/testing';

import { TuongTacThuocService } from './tuong-tac-thuoc.service';

describe('TuongTacThuocService', () => {
  let service: TuongTacThuocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TuongTacThuocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
