import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkexpiredialogComponent } from './linkexpiredialog.component';

describe('LinkexpiredialogComponent', () => {
  let component: LinkexpiredialogComponent;
  let fixture: ComponentFixture<LinkexpiredialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkexpiredialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkexpiredialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
