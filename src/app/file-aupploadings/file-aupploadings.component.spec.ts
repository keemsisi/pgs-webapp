import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileAupploadingsComponent } from './file-aupploadings.component';

describe('FileAupploadingsComponent', () => {
  let component: FileAupploadingsComponent;
  let fixture: ComponentFixture<FileAupploadingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileAupploadingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileAupploadingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
