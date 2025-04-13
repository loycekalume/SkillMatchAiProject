import { TestBed } from '@angular/core/testing';

import { ScheduleModalService } from './schedule-modal.service';

describe('ScheduleModalService', () => {
  let service: ScheduleModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
