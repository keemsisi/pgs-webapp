import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PredatoryJournalsComponent } from './predatory-journals.component';

describe('PredatoryJournalsComponent', () => {
  let component: PredatoryJournalsComponent;
  let fixture: ComponentFixture<PredatoryJournalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredatoryJournalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PredatoryJournalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
