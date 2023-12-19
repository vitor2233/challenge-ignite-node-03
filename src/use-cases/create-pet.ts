import { OrganizationRepository } from '@/repositories/organization-repository'
import { PetRepository } from '@/repositories/pet-repository'
import { Organization, Pet } from '@prisma/client'
import { hash } from 'bcryptjs'

interface CreatePetUseCaseRequest {
    name: string
    about: string
    age: string
    size: string
    energy: string
    independency: string
    environment: string
    requirements: string[]
    organization_id: string
}

interface CreatePetResponse {
    pet: Pet
}

export class CreatePetUseCase {
    constructor(
        private petRepository: PetRepository
    ) { }

    async execute({ name, about, age, size, energy, independency, environment, requirements, organization_id
    }: CreatePetUseCaseRequest): Promise<CreatePetResponse> {

        const pet = await this.petRepository.create({
            name, about, age, size, energy, independency, environment, requirements, organization_id
        })

        return { pet }
    }
}