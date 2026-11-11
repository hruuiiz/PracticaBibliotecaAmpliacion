import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltroLibros } from './filtro-libros';

describe('FiltroLibros', () => {
  let component: FiltroLibros;
  let fixture: ComponentFixture<FiltroLibros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroLibros],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltroLibros);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
