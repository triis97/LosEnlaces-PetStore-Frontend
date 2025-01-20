import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AnimalType, Pet } from '../../model/Pet';
import { PetService } from '../../services/pet.service';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-pet-dashboard',
  imports: [MatButtonModule, MatTableModule, MatButtonModule, MatPaginatorModule, MatIconModule, NgIf],
  templateUrl: './pet-dashboard.component.html',
  styleUrl: './pet-dashboard.component.css'
})
export class PetDashboardComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'description', 'animalType', 'actions'];
  dataSource = new MatTableDataSource<Pet>();
  clickedRows = new Set<Pet>()

  constructor(private router: Router, private petService: PetService) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.loadPets();
  }

  loadPets() {
    this.petService.getPets().subscribe((data: Pet[]) => {
      this.dataSource.data = data;
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
  }

  navigateToEditForm() {
    this.router.navigate(['/edit-pet']);
}
}
