import { TestBed } from '@angular/core/testing';

import { Application1Service } from './application1.service';

describe('Application1Service', () => {
  let service: Application1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Application1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
