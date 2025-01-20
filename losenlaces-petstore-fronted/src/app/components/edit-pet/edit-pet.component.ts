import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { PetService } from '../../services/pet.service';

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
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  petName: string | null = null;
  headerText = 'Create New Pet';
  submitText = 'Save pet';
  editPetForm!: FormGroup;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private petService: PetService) { }

  ngOnInit(): void {
    const petId = this.route.snapshot.paramMap.get('name');
    
    this.editPetForm = this.fb.group({
      field_1: '',
      field_2: '',
      favoriteFood: ['']
    });
    if (petId) {
      console.log('Edit pet ' + petId);
      this.submitText = 'Update pet';
      this.petService.getPetById(petId).subscribe({
        next: pet => {
          this.headerText = 'Edit pet ' + pet.name;
          this.editPetForm.patchValue({
            field_1: pet.name,
            field_2: pet.description,
            favoriteFood: pet.animalType
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
  }
}
