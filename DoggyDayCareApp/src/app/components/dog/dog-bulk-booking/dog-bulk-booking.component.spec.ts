import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogBulkBookingComponent } from './dog-bulk-booking.component';

describe('DogBulkBookingComponent', () => {
  let component: DogBulkBookingComponent;
  let fixture: ComponentFixture<DogBulkBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DogBulkBookingComponent]
    });
    fixture = TestBed.createComponent(DogBulkBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
