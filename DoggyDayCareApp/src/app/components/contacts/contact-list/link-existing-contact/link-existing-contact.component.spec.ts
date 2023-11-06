import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkExistingContactComponent } from './link-existing-contact.component';

describe('LinkExistingContactComponent', () => {
  let component: LinkExistingContactComponent;
  let fixture: ComponentFixture<LinkExistingContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinkExistingContactComponent]
    });
    fixture = TestBed.createComponent(LinkExistingContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
