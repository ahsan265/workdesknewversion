import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InviteagentComponent } from './inviteagent.component';

describe('InviteagentComponent', () => {
  let component: InviteagentComponent;
  let fixture: ComponentFixture<InviteagentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteagentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteagentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
