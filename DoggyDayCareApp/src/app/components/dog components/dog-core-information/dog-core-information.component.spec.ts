import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogCoreInformationComponent } from './dog-core-information.component';

describe('DogCoreInformationComponent', () => {
  let component: DogCoreInformationComponent;
  let fixture: ComponentFixture<DogCoreInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DogCoreInformationComponent]
    });
    fixture = TestBed.createComponent(DogCoreInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
