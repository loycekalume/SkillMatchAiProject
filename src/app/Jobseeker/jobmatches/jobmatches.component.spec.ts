import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobmatchesComponent } from './jobmatches.component';

describe('JobmatchesComponent', () => {
  let component: JobmatchesComponent;
  let fixture: ComponentFixture<JobmatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobmatchesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobmatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
