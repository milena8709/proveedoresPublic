import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoEvaluacionComponent } from './resultado-evaluacion.component';

describe('ResultadoEvaluacionComponent', () => {
  let component: ResultadoEvaluacionComponent;
  let fixture: ComponentFixture<ResultadoEvaluacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadoEvaluacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadoEvaluacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
