import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilefiltersforagentsComponent } from './mobilefiltersforagents.component';

describe('MobilefiltersforagentsComponent', () => {
  let component: MobilefiltersforagentsComponent;
  let fixture: ComponentFixture<MobilefiltersforagentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobilefiltersforagentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilefiltersforagentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
