import { TestBed } from '@angular/core/testing';

import { NgxSuperCroppieService } from './ngx-super-croppie.service';

describe('NgxSuperCroppieService', () => {
  let service: NgxSuperCroppieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxSuperCroppieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
