import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesCarouselComponent } from './clientes-carousel.component';

describe('ClientesCarouselComponent', () => {
  let component: ClientesCarouselComponent;
  let fixture: ComponentFixture<ClientesCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
