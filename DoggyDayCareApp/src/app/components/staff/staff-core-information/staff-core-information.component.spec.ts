import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffCoreInformationComponent } from './staff-core-information.component';

describe('StaffCoreInformationComponent', () => {
  let component: StaffCoreInformationComponent;
  let fixture: ComponentFixture<StaffCoreInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffCoreInformationComponent]
    });
    fixture = TestBed.createComponent(StaffCoreInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
