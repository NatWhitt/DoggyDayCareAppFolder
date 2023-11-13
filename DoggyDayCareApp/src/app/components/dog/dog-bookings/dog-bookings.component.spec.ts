import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogBookingsComponent } from './dog-bookings.component';

describe('DogBookingsComponent', () => {
  let component: DogBookingsComponent;
  let fixture: ComponentFixture<DogBookingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DogBookingsComponent]
    });
    fixture = TestBed.createComponent(DogBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
