import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivechatComponent } from './activechat.component';

describe('ActivechatComponent', () => {
  let component: ActivechatComponent;
  let fixture: ComponentFixture<ActivechatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivechatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivechatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
