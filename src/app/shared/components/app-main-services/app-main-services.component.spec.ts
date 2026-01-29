import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMainServicesComponent } from './app-main-services.component';

describe('AppMainServicesComponent', () => {
  let component: AppMainServicesComponent;
  let fixture: ComponentFixture<AppMainServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppMainServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppMainServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
