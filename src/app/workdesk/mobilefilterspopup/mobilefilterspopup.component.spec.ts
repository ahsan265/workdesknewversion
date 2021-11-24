import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilefilterspopupComponent } from './mobilefilterspopup.component';

describe('MobilefilterspopupComponent', () => {
  let component: MobilefilterspopupComponent;
  let fixture: ComponentFixture<MobilefilterspopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobilefilterspopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilefilterspopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
