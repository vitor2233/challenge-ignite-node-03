import { beforeEach, describe, expect, it, test } from 'vitest'
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { GetPetDetailsUseCase } from './get-pet-details'
import { ResourceNotFoundError } from './erros/resource-not-found-error'
import { SearchPetsUseCase } from './search-pets'

let petRepository: InMemoryPetRepository
let sut: SearchPetsUseCase

describe('Search Pets Use Case', () => {
    beforeEach(async () => {
        petRepository = new InMemoryPetRepository()
        sut = new SearchPetsUseCase(petRepository)
    })

    it('should be able to search pets', async () => {
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

        await petRepository.create({
            id: 'pet1',
            name: 'dog',
            about: 'good dog',
            age: 'New',
            size: 'Big',
            energy: 'Not a lot',
            independency: 'high',
            environment: 'Big house',
            requirements: ['toy1', 'toy2'],
            organization_id: 'org1'
        })



        const { pets } = await sut.execute({
            age: 'New',
            energy: 'a lot',
            independency: 'low',
            page: 1,
            size: 'Small'
        })
        expect(pets).toHaveLength(1)

        const bothPets = await sut.execute({
            age: 'New',
            energy: undefined,
            independency: undefined,
            page: 1,
            size: undefined
        })

        expect(bothPets.pets).toHaveLength(2)
    })

    it('should not be able to search with no data', async () => {
        const { pets } = await sut.execute({
            age: 'New',
            energy: 'a lot',
            independency: 'low',
            page: 1,
            size: 'Small'
        })
        expect(pets).toHaveLength(0)
    })
})