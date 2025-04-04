import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { UppercaseDirective } from 'src/app/directives/uppercase.directive';
import { Superhero, Team, Universe, powers } from 'src/app/models/superhero.interface';

@Component({
   selector: 'app-superhero-partial-form',
   standalone: true,
   imports: [MatFormFieldModule, MatSelectModule, MatInputModule, ReactiveFormsModule, MatButton, UppercaseDirective],
   templateUrl: './superhero-partial-form.component.html',
   styleUrl: './superhero-partial-form.component.scss',
})
export class SuperheroPartialFormComponent implements OnChanges {
   superheroForm!: FormGroup;
   universeList: Universe[] = [Universe.Dc, Universe.Marvel];
   teamList: Team[] = Array.from(Object.values(Team));
   powersList: string[] = powers;

   @Input() formTitle: string = '';
   @Input() heroData: Superhero | null = {} as Superhero;
   @Output() save: EventEmitter<Superhero> = new EventEmitter<Superhero>();

   constructor(private fb: FormBuilder, private router: Router) {
      this.superheroForm = this._createForm();
   }

   private _createForm(): FormGroup {
      return this.fb.group({
         name: ['', Validators.required],
         realName: ['', Validators.required],
         powers: [[], Validators.required],
         universe: ['', Validators.required],
         biography: [''],
         firstAppearance: [''],
         team: ['None'],
         aliases: [''],
         images: this.fb.group({
            xs: [''],
            sm: [''],
            md: [''],
            lg: [''],
         }),
      });
   }

   ngOnChanges(changes: SimpleChanges): void {
      if (changes['heroData'] && this.heroData) {
         this.superheroForm.patchValue(this.heroData);
      }
   }

   protected goToHeroesList(): void {
      this.superheroForm.reset();
      this.router.navigate(['/superheroes']);
   }

   onSubmit(): void {
      if (this.superheroForm.valid) {
         this.save.emit(this.superheroForm.value);
      }
   }
}

