import { Pet, Prisma } from "@prisma/client"

export interface PetDetails {
    name: string
    about: string,
    age: string
    size: string
    energy: string
    independency: string
    environment: string
    requirements: string[]
    organizationOwnerName: string,
    organizationCity: string,
    organizationState: string,
    organizationNumber: string
}

export interface PetRepository {
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
    findManyByCity(city: string, page: number): Promise<Pet[]>
    searchMany(query: Partial<Pet>, page: number): Promise<Pet[]>
    getPetDetailsById(id: string): Promise<PetDetails | null>
}