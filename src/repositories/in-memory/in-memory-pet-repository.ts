import { Organization, Pet, Prisma } from '@prisma/client'
import { PetDetails, PetRepository } from '../pet-repository'
import { randomUUID } from 'crypto'
import { InMemoryOrganizationRepository } from './in-memory-organization-repository'
import { hash } from 'bcryptjs'

export class InMemoryPetRepository implements PetRepository {
    public items: Pet[] = []
    public organizations: Organization[] = []
    async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
        const organization: Organization = {
            id: randomUUID(),
            owner: 'vitor',
            email: 'vitor@email.com',
            cep: '30371823',
            city: 'BH',
            state: 'MG',
            phone: '3191234567897',
            password_hash: await hash('12345', 6),
            created_at: new Date(),
        }
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
            organization_id: organization.id
        }
        this.organizations.push(organization)
        this.items.push(pet)

        return pet
    }

    async findManyByCity(city: string, page: number): Promise<Pet[]> {
        const organizations = this.organizations.filter(org => org.city == city)
        const organizationsByCity: string[] = []
        organizations.forEach(org => {
            if (org.city == city)
                organizationsByCity.push(org.id)
        })
        const petsByCity = this.items.filter(item => organizationsByCity.includes(item.organization_id))
            .slice((page - 1) * 20, page * 20)
        return petsByCity

    }

    async searchMany(query: Partial<Pet>, page: number): Promise<Pet[]> {
        const pets: Pet[] = this.items.filter((pet) => {
            return (
                (!query.age || pet.age === query.age) &&
                (!query.energy || pet.energy.toLowerCase() === query.energy.toLowerCase()) &&
                (!query.size || pet.size.toLowerCase() === query.size.toLowerCase()) &&
                (!query.independency || pet.independency.toLowerCase() === query.independency.toLowerCase())

            );
        }).slice((page - 1) * 20, page * 20)

        return pets
    }

    async getPetDetailsById(id: string): Promise<PetDetails | null> {
        const pet = this.items.find(item => item.id == id)
        if (!pet)
            return null
        const organization = this.organizations.find(org => org.id == pet.organization_id)
        if (!organization)
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
            organizationOwnerName: organization.owner,
            organizationCity: organization.city,
            organizationState: organization.state,
            organizationNumber: organization.phone,
        }

        return petDetails
    }

}