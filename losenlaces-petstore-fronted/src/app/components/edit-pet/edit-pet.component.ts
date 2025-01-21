import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PetService } from '../../services/pet.service';
import { AnimalType } from '../../model/Pet';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-pet',
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './edit-pet.component.html',
  styleUrl: './edit-pet.component.css'
})
export class EditPetComponent {
    private _snackBar = inject(MatSnackBar);
  animalTypes: { value: string, viewValue: string }[] = Object.keys(AnimalType).map(key => ({
    value: key,
    viewValue: AnimalType[key as keyof typeof AnimalType]
  }));
  documentId: string | null = null;
  headerText = 'Create New Pet';
  submitText = 'Save pet';
  editPetForm!: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private petService: PetService) { }

  ngOnInit(): void {
    this.documentId = this.route.snapshot.paramMap.get('name');

    this.editPetForm = this.fb.group({
      name: '',
      description: '',
      type: ['']
    });
    if (this.documentId) {
      console.log('Edit pet ' + this.documentId);
      this.submitText = 'Update pet';
      this.petService.getPetById(this.documentId).subscribe({
        next: pet => {
          this.headerText = 'Edit pet ' + pet.name;
          this.editPetForm.patchValue({
            name: pet.name,
            description: pet.description,
            type: pet.type
          });
        },
        error: error => {
          console.error('Error fetching pet:', error);
        }
      });
    }

  }

  onSubmit(): void {
    console.log(this.editPetForm.value);
    if (this.documentId) {
      this.petService.updatePetById(this.documentId, this.editPetForm.value).subscribe({
        next: (response) => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Error saving pet:', err);
          this._snackBar.open(`Error saving pet ${err}`, 'Close', {
            duration: 4000
          });
        }
      });
    } else {
      this.petService.savePet(this.editPetForm.value).subscribe({
        next: (response) => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Error saving pet:', err);
          this._snackBar.open(`Error saving pet ${err}`, 'Close', {
            duration: 4000
          });
        }
      });
    }
  }
}
