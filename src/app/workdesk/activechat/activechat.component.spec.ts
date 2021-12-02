import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ActivechatComponent } from './activechat.component';

describe('ActivechatComponent', () => {
  let component: ActivechatComponent;
  let fixture: ComponentFixture<ActivechatComponent>;

  beforeEach(waitForAsync(() => {
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
