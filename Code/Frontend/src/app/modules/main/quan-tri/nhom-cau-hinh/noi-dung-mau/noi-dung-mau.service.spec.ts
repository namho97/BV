/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NoiDungMauService } from './noi-dung-mau.service';

describe('Service: NoiDungMau', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoiDungMauService]
    });
  });

  it('should ...', inject([NoiDungMauService], (service: NoiDungMauService) => {
    expect(service).toBeTruthy();
  }));
});
