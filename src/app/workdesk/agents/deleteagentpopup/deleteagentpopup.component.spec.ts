import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeleteagentpopupComponent } from './deleteagentpopup.component';

describe('DeleteagentpopupComponent', () => {
  let component: DeleteagentpopupComponent;
  let fixture: ComponentFixture<DeleteagentpopupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteagentpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteagentpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
