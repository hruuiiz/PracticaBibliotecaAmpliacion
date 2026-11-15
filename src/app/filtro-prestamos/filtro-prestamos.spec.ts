import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltroPrestamos } from './filtro-prestamos';

describe('FiltroPrestamos', () => {
  let component: FiltroPrestamos;
  let fixture: ComponentFixture<FiltroPrestamos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroPrestamos],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltroPrestamos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
