import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsPostedComponent } from './jobs-posted.component';

describe('JobsPostedComponent', () => {
  let component: JobsPostedComponent;
  let fixture: ComponentFixture<JobsPostedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsPostedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobsPostedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
