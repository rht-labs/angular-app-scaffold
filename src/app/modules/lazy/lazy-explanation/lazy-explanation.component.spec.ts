import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyExplanationComponent } from './lazy-explanation.component';

describe('LazyExplanationComponent', () => {
  let component: LazyExplanationComponent;
  let fixture: ComponentFixture<LazyExplanationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LazyExplanationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyExplanationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
