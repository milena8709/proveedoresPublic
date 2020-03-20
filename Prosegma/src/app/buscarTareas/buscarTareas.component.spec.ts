import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarTareasComponent } from './buscarTareas.component';

describe('BuscarTareasComponent', () => {
  let component: BuscarTareasComponent;
  let fixture: ComponentFixture<BuscarTareasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarTareasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
