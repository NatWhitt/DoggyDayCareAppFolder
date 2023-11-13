import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDogComponent } from './create-dog.component';

describe('CreateDogComponent', () => {
  let component: CreateDogComponent;
  let fixture: ComponentFixture<CreateDogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDogComponent]
    });
    fixture = TestBed.createComponent(CreateDogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
