import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountactivationComponent } from './accountactivation.component';

describe('AccountactivationComponent', () => {
  let component: AccountactivationComponent;
  let fixture: ComponentFixture<AccountactivationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountactivationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountactivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
