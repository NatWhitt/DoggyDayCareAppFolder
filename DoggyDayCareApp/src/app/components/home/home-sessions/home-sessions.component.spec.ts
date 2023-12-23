import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSessionsComponent } from './home-sessions.component';

describe('HomeSessionsComponent', () => {
  let component: HomeSessionsComponent;
  let fixture: ComponentFixture<HomeSessionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeSessionsComponent]
    });
    fixture = TestBed.createComponent(HomeSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
