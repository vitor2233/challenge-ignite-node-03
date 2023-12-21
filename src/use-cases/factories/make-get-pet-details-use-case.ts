import { PrismaPetRepository } from '@/repositories/prisma/prisma-pet-repository'
import { GetPetDetailsUseCase } from '../get-pet-details'

export function makeGetPetDetailsUseCase() {
    const petRepository = new PrismaPetRepository()
    const getPetDetailsUseCase = new GetPetDetailsUseCase(petRepository)

    return getPetDetailsUseCase
}