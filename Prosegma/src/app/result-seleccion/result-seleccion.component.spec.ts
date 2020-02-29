import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultSeleccionComponent } from './result-seleccion.component';

describe('ResultSeleccionComponent', () => {
  let component: ResultSeleccionComponent;
  let fixture: ComponentFixture<ResultSeleccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultSeleccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultSeleccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
