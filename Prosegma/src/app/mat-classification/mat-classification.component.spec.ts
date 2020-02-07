import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatClassificationComponent } from './mat-classification.component';

describe('MatClassificationComponent', () => {
  let component: MatClassificationComponent;
  let fixture: ComponentFixture<MatClassificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatClassificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
