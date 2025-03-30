import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperheroPartialFormComponent } from './superhero-partial-form.component';

describe('SuperheroPartialFormComponent', () => {
  let component: SuperheroPartialFormComponent;
  let fixture: ComponentFixture<SuperheroPartialFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperheroPartialFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperheroPartialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
