import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { hash } from 'bcryptjs'
import { GetPetByCityUseCase } from './get-pet-by-city'

let petRepository: InMemoryPetRepository
let organizationRepository: InMemoryOrganizationRepository
let sut: GetPetByCityUseCase

describe('Get Pets By City Use Case', () => {
    beforeEach(async () => {
        petRepository = new InMemoryPetRepository()
        organizationRepository = new InMemoryOrganizationRepository()
        sut = new GetPetByCityUseCase(petRepository)
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

    it('should be able to list pets by city', async () => {
        await petRepository.create({
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

        const { pets } = await sut.execute({
            city: 'BH',
            page: 1
        })

        expect(pets).toHaveLength(1)
    })

    it('should not be able to list pets by city that does not exists', async () => {
        await petRepository.create({
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

        const { pets } = await sut.execute({
            city: 'Non existent city',
            page: 1
        })

        expect(pets).toHaveLength(0)
    })
})