import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewserviceComponent } from './reviewservice.component';

describe('ReviewserviceComponent', () => {
  let component: ReviewserviceComponent;
  let fixture: ComponentFixture<ReviewserviceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewserviceComponent]
    });
    fixture = TestBed.createComponent(ReviewserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
