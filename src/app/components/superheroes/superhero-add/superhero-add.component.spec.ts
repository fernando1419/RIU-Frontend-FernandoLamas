import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperheroAddComponent } from './superhero-add.component';

describe('SuperheroAddComponent', () => {
  let component: SuperheroAddComponent;
  let fixture: ComponentFixture<SuperheroAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperheroAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperheroAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
