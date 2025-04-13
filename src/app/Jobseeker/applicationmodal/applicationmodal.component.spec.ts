import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationmodalComponent } from './applicationmodal.component';

describe('ApplicationmodalComponent', () => {
  let component: ApplicationmodalComponent;
  let fixture: ComponentFixture<ApplicationmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationmodalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
