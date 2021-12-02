import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ViewchatComponent } from './viewchat.component';

describe('ViewchatComponent', () => {
  let component: ViewchatComponent;
  let fixture: ComponentFixture<ViewchatComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewchatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
