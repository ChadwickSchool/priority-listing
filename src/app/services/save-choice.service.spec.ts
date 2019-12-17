import { TestBed, async } from '@angular/core/testing';

import { SaveChoiceService } from './save-choice.service';

import { of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Choice } from '../shared/models/choice.model';
import ChoiceClass from '../shared/models/choice';

describe('SaveChoiceService', () => {
  // let service: SaveChoiceService;
  const input: Array<Choice> = [];
  const data = of(input);

  const docStub = {
    set(choice: Choice) {
      input.push(choice);
    }
  };

  const collectionStub = {
    valueChanges: jasmine.createSpy('valueChanges').and.returnValue(data),
    doc: jasmine.createSpy('doc').and.returnValue(docStub)
  };

  const angularFirestoreStub = {
    collection: jasmine.createSpy('collection').and.returnValue(collectionStub),
    createId(): string {
      return '100';
    }
  };
  beforeEach(async(() =>  {
    TestBed.configureTestingModule({
      providers: [{ provide: AngularFirestore, useValue: angularFirestoreStub }]
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: SaveChoiceService = TestBed.get(SaveChoiceService);
    expect(service).toBeTruthy();
    expect(angularFirestoreStub.collection).toHaveBeenCalledWith('choices');
  });

  fit('should add choice when add is called', (done: DoneFn) => {
    const service: SaveChoiceService = TestBed.get(SaveChoiceService);
    const expectedRanking = ['choice1']
    service.addChoices(expectedRanking);
    const expectedResult = {id: '100', ranking: expectedRanking};
    service.choices$.subscribe(choices => {
      expect(choices).toContain(expectedResult);
      done();
    });
  });
});
