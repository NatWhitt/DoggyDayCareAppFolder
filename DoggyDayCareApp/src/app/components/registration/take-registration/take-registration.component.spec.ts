import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeARegistrationComponent } from './take-registration.component';

describe('TakeARegistrationComponent', () => {
  let component: TakeARegistrationComponent;
  let fixture: ComponentFixture<TakeARegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TakeARegistrationComponent]
    });
    fixture = TestBed.createComponent(TakeARegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
