import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelarCompraComponent } from './cancelar-compra.component';

describe('CancelarCompraComponent', () => {
  let component: CancelarCompraComponent;
  let fixture: ComponentFixture<CancelarCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelarCompraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CancelarCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
