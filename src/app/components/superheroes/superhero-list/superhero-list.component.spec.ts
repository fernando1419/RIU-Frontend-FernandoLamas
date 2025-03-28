import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperheroListComponent } from './superhero-list.component';

describe('SuperheroListComponent', () => {
   let component: SuperheroListComponent;
   let fixture: ComponentFixture<SuperheroListComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [SuperheroListComponent],
      })
         .compileComponents();

      fixture = TestBed.createComponent(SuperheroListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
