import { beforeEach, describe, expect, it, test } from 'vitest'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { GetPetDetailsUseCase } from './get-pet-details'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

let petRepository: InMemoryPetRepository
let sut: GetPetDetailsUseCase

describe('Get Pet Details Use Case', () => {
    beforeEach(async () => {
        petRepository = new InMemoryPetRepository()
        sut = new GetPetDetailsUseCase(petRepository)
    })

    it('should be able to get pet details', async () => {
        await petRepository.create({
            id: 'pet1',
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

        const { pet } = await sut.execute({
            id: 'pet1'
        })

        expect(pet.about).toEqual(expect.any(String))
        expect(pet.organizationOwnerName).toEqual(expect.any(String))
    })

    it('should not be able to get pet details with non existent id', async () => {
        await expect(sut.execute({
            id: 'non existent id'
        })).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})