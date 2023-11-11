import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBulkSessionsComponent } from './create-bulk-sessions.component';

describe('CreateBulkSessionsComponent', () => {
  let component: CreateBulkSessionsComponent;
  let fixture: ComponentFixture<CreateBulkSessionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBulkSessionsComponent]
    });
    fixture = TestBed.createComponent(CreateBulkSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
