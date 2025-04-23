import { TestBed } from '@angular/core/testing';

import { EmployerprofileserviceService } from './employerprofileservice.service';

describe('EmployerprofileserviceService', () => {
  let service: EmployerprofileserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployerprofileserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
