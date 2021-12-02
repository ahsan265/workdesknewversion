import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditformComponent } from './editform.component';

describe('EditformComponent', () => {
  let component: EditformComponent;
  let fixture: ComponentFixture<EditformComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
