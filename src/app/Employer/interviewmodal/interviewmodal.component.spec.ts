import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewmodalComponent } from './interviewmodal.component';

describe('InterviewmodalComponent', () => {
  let component: InterviewmodalComponent;
  let fixture: ComponentFixture<InterviewmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewmodalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InterviewmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
