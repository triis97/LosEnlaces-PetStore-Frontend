import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnimalType, Pet } from '../model/Pet';


@Injectable({
  providedIn: 'root'
})
export class PetService {

  private apiUrl = 'http://localhost:8080/pet-shop';

  constructor(private http: HttpClient) { }

  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.apiUrl);
    // return new Observable(subscriber => {
    //   subscriber.next(ELEMENT_DATA);
    //   subscriber.complete();
    // });
  }

  getPetById(documentId: string): Observable<Pet> {
    return this.http.get<Pet>(`${this.apiUrl}/${documentId}`);
    // return new Observable(subscriber => {
    //   const pet = ELEMENT_DATA.find(p => p.documentId === documentId);
    //   if (pet) {
    //     subscriber.next(pet);
    //   } else {
    //     subscriber.error('Pet not found');
    //   }
    //   subscriber.complete();
    // });
  }
  
  deletePetById(documentId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${documentId}`);
    // return new Observable(subscriber => {
    //   const index = ELEMENT_DATA.findIndex(p => p.documentId === documentId);
    //   if (index !== -1) {
    //     ELEMENT_DATA.splice(index, 1);
    //     subscriber.next();
    //   } else {
    //     subscriber.error('Pet not found');
    //   }
    //   subscriber.complete();
    // });
  }

  updatePetById(documentId: string, updatedPet: Pet): Observable<Pet> {
    return this.http.put<Pet>(`${this.apiUrl}/${documentId}`, updatedPet);
    // return new Observable(subscriber => {
    //   const index = ELEMENT_DATA.findIndex(p => p.documentId === documentId);
    //   if (index !== -1) {
    //     ELEMENT_DATA[index] = updatedPet;
    //     subscriber.next(updatedPet);
    //   } else {
    //     subscriber.error('Pet not found');
    //   }
    //   subscriber.complete();
    // });
  }

}

const ELEMENT_DATA: Pet[] = [
  {
    documentId: '1',
    name: 'Buddy',
    description: 'A friendly dog',
    animalType: AnimalType.DOG
},
{
    documentId: '2',
    name: 'Whiskers',
    description: 'A curious cat',
    animalType: AnimalType.CAT
},
{
    documentId: '3',
    name: 'Tweety',
    description: 'A small yellow bird',
    animalType: AnimalType.BIRD
},
{
    documentId: '4',
    name: 'Nemo',
    description: 'A colorful fish',
    animalType: AnimalType.FISH
},
{
    documentId: '5',
    name: 'Slinky',
    description: 'A slithery reptile',
    animalType: AnimalType.REPTILE
}
];