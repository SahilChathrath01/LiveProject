import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTrakingIdComponent } from './manage-traking-id.component';

describe('ManageTrakingIdComponent', () => {
  let component: ManageTrakingIdComponent;
  let fixture: ComponentFixture<ManageTrakingIdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageTrakingIdComponent]
    });
    fixture = TestBed.createComponent(ManageTrakingIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
