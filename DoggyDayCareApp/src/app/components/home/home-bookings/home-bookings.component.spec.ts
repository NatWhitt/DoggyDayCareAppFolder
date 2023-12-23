import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBookingsComponent } from './home-bookings.component';

describe('HomeBookingsComponent', () => {
  let component: HomeBookingsComponent;
  let fixture: ComponentFixture<HomeBookingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeBookingsComponent]
    });
    fixture = TestBed.createComponent(HomeBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
