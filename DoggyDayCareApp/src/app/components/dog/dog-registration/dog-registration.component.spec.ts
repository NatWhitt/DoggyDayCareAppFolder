import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogRegistrationComponent } from './dog-registration.component';

describe('DogRegistrationComponent', () => {
  let component: DogRegistrationComponent;
  let fixture: ComponentFixture<DogRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DogRegistrationComponent]
    });
    fixture = TestBed.createComponent(DogRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
