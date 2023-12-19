import { Pet, Prisma } from '@prisma/client'
import { PetRepository } from '../pet-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetRepository implements PetRepository {
    public items: Pet[] = []
    async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
        const pet: Pet = {
            id: data.id ?? randomUUID(),
            name: data.name,
            about: data.about,
            age: data.age,
            energy: data.energy,
            environment: data.environment,
            independency: data.independency,
            requirements: data.requirements as string[],
            created_at: new Date(),
            size: data.size,
            organization_id: data.organization_id
        }
        this.items.push(pet)

        return pet
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