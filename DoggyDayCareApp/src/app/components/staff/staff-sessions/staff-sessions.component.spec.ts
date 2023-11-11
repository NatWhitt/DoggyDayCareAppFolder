import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffSessionsComponent } from './staff-sessions.component';

describe('StaffSessionsComponent', () => {
  let component: StaffSessionsComponent;
  let fixture: ComponentFixture<StaffSessionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffSessionsComponent]
    });
    fixture = TestBed.createComponent(StaffSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
