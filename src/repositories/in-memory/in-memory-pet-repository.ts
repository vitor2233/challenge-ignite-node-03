import { Pet, Prisma } from "@prisma/client";
import { PetRepository } from "../pet-repository";

export class InMemoryPetRepository implements PetRepository {
    public items: Pet[] = []
    async create(pet: Prisma.PetCreateInput): Promise<Pet> {
        throw new Error("Method not implemented.");
    }

    async findManyByCity(page: number, city: string): Promise<Pet[]> {
        throw new Error("Method not implemented.");
    }

    async searchMany(query: string, page: number): Promise<Pet[]> {
        throw new Error("Method not implemented.");
    }

    async getPetDetailsById(id: string): Promise<Pet | null> {
        throw new Error("Method not implemented.");
    }

}