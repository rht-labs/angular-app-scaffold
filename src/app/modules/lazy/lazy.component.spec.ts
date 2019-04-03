import { HeaderComponent } from 'src/app/shared/header/header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LazyComponent } from './lazy.component';
import { LazyExplanationComponent } from './lazy-explanation/lazy-explanation.component';

describe('LazyComponent', () => {
  let component: LazyComponent;
  let fixture: ComponentFixture<LazyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LazyComponent, LazyExplanationComponent, HeaderComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
