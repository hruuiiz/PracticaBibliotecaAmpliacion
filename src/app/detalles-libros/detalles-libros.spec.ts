import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallesLibros } from './detalles-libros';

describe('DetallesLibros', () => {
  let component: DetallesLibros;
  let fixture: ComponentFixture<DetallesLibros>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesLibros],
    }).compileComponents();

    fixture = TestBed.createComponent(DetallesLibros);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
