import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StudentComponent2 } from './student2.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SaveChoiceService } from '../services/save-choice.service';
import { GetOptionsService } from '../services/get-options.service';
import { of } from 'rxjs';

describe('StudentComponent2', () => {
  let mockSaveChoiceService;
  let mockGetOptionsService;
  let OPTIONS;
  beforeEach(async(() => {
    mockSaveChoiceService = jasmine.createSpyObj(['getChoices', 'addChoices']);
    mockGetOptionsService = jasmine.createSpyObj(['getOptions', 'addOptions']);
    OPTIONS = [{tasks: ['sleep', 'eat', 'brush teeth', 'take a shower', 'go to the bathroom']}];
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, DragDropModule],
      declarations: [StudentComponent2],
      providers: [
        { provide: SaveChoiceService, useValue: mockSaveChoiceService },
        { provide: GetOptionsService, useValue: mockGetOptionsService }

      ]
    }).compileComponents();
  }));

  it('should set todo correctly from service', () => {
    const fixture = TestBed.createComponent(StudentComponent2);
    const app = fixture.debugElement.componentInstance;
    mockGetOptionsService.getOptions.and.returnValue(of(OPTIONS));
    fixture.detectChanges();
    expect(fixture.componentInstance.todo[0]).toBe('sleep');
  });

  it(`should have as title 'drag'`, () => {
    const fixture = TestBed.createComponent(StudentComponent2);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('drag');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(StudentComponent2);
    mockGetOptionsService.getOptions.and.returnValue(of(OPTIONS));
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain(
      'drag app is running!'
    );
  });
});
