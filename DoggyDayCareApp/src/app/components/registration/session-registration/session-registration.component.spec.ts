import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionRegistrationComponent } from './session-registration.component';

describe('SessionRegistrationComponent', () => {
  let component: SessionRegistrationComponent;
  let fixture: ComponentFixture<SessionRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SessionRegistrationComponent]
    });
    fixture = TestBed.createComponent(SessionRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
