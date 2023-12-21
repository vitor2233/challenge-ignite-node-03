import { PetRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'

interface GetPetByCityUseCaseRequest {
    city: string
    page: number
}

interface GetPetByCityUseCaseResponse {
    pets: Pet[]
}

export class GetPetByCityUseCase {
    constructor(
        private petRepository: PetRepository
    ) { }

    async execute({ city, page
    }: GetPetByCityUseCaseRequest): Promise<GetPetByCityUseCaseResponse> {

        const pets = await this.petRepository.findManyByCity(
            city, page
        )

        return { pets }
    }
}