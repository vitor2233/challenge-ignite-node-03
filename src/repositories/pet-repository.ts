import { Pet, Prisma } from "@prisma/client"


export interface PetRepository {
    create(pet: Prisma.PetUncheckedCreateInput): Promise<Pet>
    findManyByCity(page: number, city: string): Promise<Pet[]>
    searchMany(query: string, page: number): Promise<Pet[]>
    getPetDetailsById(id: string): Promise<Pet | null>
}