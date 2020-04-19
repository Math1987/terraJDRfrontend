import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBoxControlComponent } from './update-box-control.component';

describe('UpdateBoxControlComponent', () => {
  let component: UpdateBoxControlComponent;
  let fixture: ComponentFixture<UpdateBoxControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBoxControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBoxControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
