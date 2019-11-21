import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StudentComponent } from './student.component';

describe('StudentComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [StudentComponent]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(StudentComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'drag'`, () => {
    const fixture = TestBed.createComponent(StudentComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('drag');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(StudentComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain(
      'drag app is running!'
    );
  });
});
