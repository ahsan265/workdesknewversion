import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddagentComponent } from './addagent.component';

describe('AddagentComponent', () => {
  let component: AddagentComponent;
  let fixture: ComponentFixture<AddagentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddagentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddagentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
