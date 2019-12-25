import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { infoComponent } from './login-credentials.component';

describe('infoComponent', () => {
  let component: infoComponent;
  let fixture: ComponentFixture<infoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ infoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(infoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
