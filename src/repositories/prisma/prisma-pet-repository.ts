import { Pet, Prisma } from '@prisma/client';
import { PetDetails, PetRepository } from '../pet-repository'
import { prisma } from '@/lib/prisma';


export class PrismaPetRepository implements PetRepository {
    async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
        const pet = await prisma.pet.create({
            data
        })

        return pet
    }

    async findManyByCity(city: string, page: number): Promise<Pet[]> {
        const pets = await prisma.pet.findMany({
            where: {
                organization: {
                    city
                }
            },
            skip: (page - 1) * 20,
            take: 20
        })

        return pets
    }

    async searchMany(query: Partial<Pet>, page: number): Promise<Pet[]> {
        const pets = await prisma.pet.findMany({
            where: {
                age: query.age != undefined ? { contains: query.age, mode: 'insensitive' } : undefined,
                energy: query.energy !== undefined ? { contains: query.energy, mode: 'insensitive' } : undefined,
                size: query.size !== undefined ? { contains: query.size, mode: 'insensitive' } : undefined,
                independency: query.independency !== undefined ? { contains: query.independency, mode: 'insensitive' } : undefined,
            },
            skip: (page - 1) * 20,
            take: 20,
        });

        return pets
    }

    async getPetDetailsById(id: string): Promise<PetDetails | null> {
        const pet = await prisma.pet.findUnique({
            where: { id },
            include: { organization: true }
        })

        if (!pet)
            return null


        const petDetails: PetDetails = {
            name: pet.name,
            about: pet.about,
            age: pet.age,
            size: pet.size,
            energy: pet.energy,
            independency: pet.independency,
            environment: pet.environment,
            requirements: pet.requirements,
            organizationOwnerName: pet.organization.owner,
            organizationCity: pet.organization.city,
            organizationState: pet.organization.state,
            organizationNumber: pet.organization.phone,
        }

        return petDetails
    }

}