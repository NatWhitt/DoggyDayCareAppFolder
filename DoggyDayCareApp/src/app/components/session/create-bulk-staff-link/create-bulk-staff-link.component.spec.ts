import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBulkStaffLinkComponent } from './create-bulk-staff-link.component';

describe('CreateBulkStaffLinkComponent', () => {
  let component: CreateBulkStaffLinkComponent;
  let fixture: ComponentFixture<CreateBulkStaffLinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBulkStaffLinkComponent]
    });
    fixture = TestBed.createComponent(CreateBulkStaffLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
