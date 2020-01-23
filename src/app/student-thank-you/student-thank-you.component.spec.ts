import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentThankYouComponent } from './student-thank-you.component';

describe('StudentThankYouComponent', () => {
  let component: StudentThankYouComponent;
  let fixture: ComponentFixture<StudentThankYouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentThankYouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentThankYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
