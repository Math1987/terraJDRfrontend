import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MartyrComponent } from './martyr.component';

describe('MartyrComponent', () => {
  let component: MartyrComponent;
  let fixture: ComponentFixture<MartyrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MartyrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MartyrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
