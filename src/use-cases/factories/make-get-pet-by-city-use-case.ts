import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { GetPetByCityUseCase } from '../get-pet-by-city'

export function makeGetPetByCityUseCase() {
    const petRepository = new PrismaPetRepository()
    const getPetByCityUseCase = new GetPetByCityUseCase(petRepository)

    return getPetByCityUseCase
}