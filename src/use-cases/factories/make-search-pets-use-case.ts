import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { SearchPetsUseCase } from '../search-pets'

export function makeSearchPetsUseCase() {
    const petRepository = new PrismaPetRepository()
    const searchPetsUseCase = new SearchPetsUseCase(petRepository)

    return searchPetsUseCase
}