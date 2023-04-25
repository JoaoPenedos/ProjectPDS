import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSeriesComponent } from './lista-series.component';

describe('ListaSeriesComponent', () => {
  let component: ListaSeriesComponent;
  let fixture: ComponentFixture<ListaSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaSeriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
