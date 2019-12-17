import { TestBed, async } from '@angular/core/testing';

import { SaveChoiceService } from './save-choice.service';
import { Choices } from '../shared/models/choices';
import { of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

describe('SaveChoiceService', () => {
  // let service: SaveChoiceService;
  const input: Array<Choices> = [];
  const data = of(input);

  const docStub = {
    set(choice: Choices) {
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
    service.addChoices('choice1');
    service.choices$.subscribe(choices => {
      expect(service.choices$).toContain('choice1');
      done();
    });
  });
});

