import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveResourceComponent } from './give-resource.component';

describe('GiveResourceComponent', () => {
  let component: GiveResourceComponent;
  let fixture: ComponentFixture<GiveResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiveResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiveResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
