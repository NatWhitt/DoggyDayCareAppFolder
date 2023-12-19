import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAccountComponent } from './staff-account.component';

describe('StaffAccountComponent', () => {
  let component: StaffAccountComponent;
  let fixture: ComponentFixture<StaffAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffAccountComponent]
    });
    fixture = TestBed.createComponent(StaffAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
