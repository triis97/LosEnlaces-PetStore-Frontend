import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AnimalType, Pet } from '../../model/Pet';
import { PetService } from '../../services/pet.service';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-pet-dashboard',
  imports: [MatButtonModule, MatTableModule, MatButtonModule, MatPaginatorModule, MatIconModule, NgIf, MatProgressSpinnerModule],
  templateUrl: './pet-dashboard.component.html',
  styleUrl: './pet-dashboard.component.css'
})
export class PetDashboardComponent implements AfterViewInit {
  private _snackBar = inject(MatSnackBar);
  displayedColumns: string[] = ['name', 'description', 'animalType', 'actions'];
  dataSource = new MatTableDataSource<Pet>();
  clickedRows = new Set<Pet>()
  isLoading = true;

  constructor(private router: Router, private petService: PetService) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.loadPets();
  }

  loadPets() {
    this.petService.getPets().subscribe({
      next: (data: Pet[]) => {
        this.dataSource.data = data;
        this.isLoading = false;
      },
      error: (error) => {
        this._snackBar.open(`Error retrieving Pets`, 'Close', {
          duration: 4000
        });
        this.isLoading = false;
      }
    });
  }

  editPet(row: Pet, event: Event) {
    event.stopPropagation();
    console.log('Edit pet' + row.documentId);
    this.router.navigate(['/edit-pet', row.documentId]);
  }

  deletePet(element: any, event: Event) {
    event.stopPropagation();
    // Implement delete logic here
    console.log('Delete pet:', element);
    this.petService.deletePetById(element.documentId).subscribe({
      next: () => {
        this.loadPets();
      },
      error: (error) => {
        console.error('Error deleting pet:', error);
        this._snackBar.open(`Error deleting pet ${error}`, 'Close', {
          duration: 4000
        });
      }
    });
  }
  navigateToEditForm() {
    this.router.navigate(['/edit-pet']);
  }

  getEnumType(type: AnimalType): string {
    const typeString = type;
    const formattedType = typeString.charAt(0).toUpperCase() + typeString.slice(1).toLowerCase();
    console.log('Type:', formattedType);
    return formattedType;
  }
}
