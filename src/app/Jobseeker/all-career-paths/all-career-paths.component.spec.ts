import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCareerPathsComponent } from './all-career-paths.component';

describe('AllCareerPathsComponent', () => {
  let component: AllCareerPathsComponent;
  let fixture: ComponentFixture<AllCareerPathsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllCareerPathsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllCareerPathsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
