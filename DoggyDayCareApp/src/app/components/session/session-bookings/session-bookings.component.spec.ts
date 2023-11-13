import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionBookingsComponent } from './session-bookings.component';

describe('SessionBookingsComponent', () => {
  let component: SessionBookingsComponent;
  let fixture: ComponentFixture<SessionBookingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SessionBookingsComponent]
    });
    fixture = TestBed.createComponent(SessionBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
