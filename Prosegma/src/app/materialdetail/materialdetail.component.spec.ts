import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialdetailComponent } from './materialdetail.component';

describe('MaterialdetailComponent', () => {
  let component: MaterialdetailComponent;
  let fixture: ComponentFixture<MaterialdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
