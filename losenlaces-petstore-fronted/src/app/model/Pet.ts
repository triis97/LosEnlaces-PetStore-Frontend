export interface Pet {
    documentId: string;
    name: string;
    description: string;
    type: AnimalType;
}

export enum AnimalType {
    DOG = "Dog",
    CAT = "Cat",
    BIRD = "Bird",
    FERRET = "Ferret",
    RABBIT = "Rabbit",
    FISH = "Fish",
    REPTILE = "Reptile",
    OTHER = "Other"
}