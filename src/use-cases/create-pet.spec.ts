import { beforeEach, describe, expect, it, test } from 'vitest'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { CreatePetUseCase } from './create-pet'
import { hash } from 'bcryptjs'

let petRepository: InMemoryPetRepository
let organizationRepository: InMemoryOrganizationRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
    beforeEach(async () => {
        petRepository = new InMemoryPetRepository()
        organizationRepository = new InMemoryOrganizationRepository()
        sut = new CreatePetUseCase(petRepository)
        await organizationRepository.create({
            id: 'org1',
            owner: 'vitor',
            email: 'vitor@email.com',
            cep: '30371823',
            city: 'BH',
            state: 'MG',
            phone: '3191234567897',
            password_hash: await hash('12345', 6)
        })
    })

    it('should be able to create a pet', async () => {
        const { pet } = await sut.execute({
            name: 'dog',
            about: 'good dog',
            age: 'New',
            size: 'Small',
            energy: 'a lot',
            independency: 'low',
            environment: 'Big house',
            requirements: ['toy1', 'toy2'],
            organization_id: 'org1'
        })

        expect(pet.id).toEqual(expect.any(String))
    })
})