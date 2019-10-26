import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatChipsInputComponent } from './mat-chips-input.component';

describe('MatChipsInputComponent', () => {
  let component: MatChipsInputComponent;
  let fixture: ComponentFixture<MatChipsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatChipsInputComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatChipsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
