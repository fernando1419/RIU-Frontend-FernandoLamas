import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Universe } from 'src/app/models/superhero.interface';
import { SuperheroApiService } from 'src/app/services/superhero-api.service';

@Component({
   selector: 'app-superhero-edit',
   standalone: true,
   imports: [MatFormFieldModule, MatSelectModule, MatInputModule, ReactiveFormsModule, MatButton],
   templateUrl: './superhero-edit.component.html',
   styleUrl: './superhero-edit.component.scss',
})
export class SuperheroEditComponent implements OnInit {
   superheroForm!: FormGroup;
   universeList: Universe[] = [Universe.Dc, Universe.Marvel];
   powersList: string[] = [ // TODO: remove asap!
      'Web-slinging',
      'Wall-crawling',
      'Super strength',
      'Spider sense',
      'Flight',
      'Laser vision',
      'Invisibility',
      'Teleportation',
      'Super speed',
   ];

   constructor(private fb: FormBuilder, private superheroApiService: SuperheroApiService) { }

   private _createForm(): FormGroup {
      return this.fb.group({
         name: ['', Validators.required],
         realName: ['', Validators.required],
         powers: [[], Validators.required],
         universe: ['', Validators.required],
         biography: [''],
         firstAppearance: [''],
         team: [''],
         aliases: [''],
         images: this.fb.group({
            xs: [''],
            sm: [''],
            md: [''],
            lg: [''],
         }),
      });
   }

   ngOnInit(): void {
      this.superheroForm = this._createForm();
   }

   protected goToHeroesList(): void {
      this.superheroForm.reset();
      //   this.router.navigate(['/heroes']);
      location.href = '/';
   }

   onSubmit() {
      if (this.superheroForm.valid) {
         const newSuperhero = this.superheroForm.value;
         this.superheroApiService.addHero(newSuperhero).subscribe(response => {
            console.log('Hero added:', response);
            // TODO: redirect to heroes list
         });
      }
   }
}
