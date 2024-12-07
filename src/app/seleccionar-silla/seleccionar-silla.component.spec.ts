import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarSillaComponent } from './seleccionar-silla.component';

describe('SeleccionarSillaComponent', () => {
  let component: SeleccionarSillaComponent;
  let fixture: ComponentFixture<SeleccionarSillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionarSillaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeleccionarSillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
