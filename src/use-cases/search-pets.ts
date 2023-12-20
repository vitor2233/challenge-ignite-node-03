import { PetRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'

interface SearchPetsUseCaseRequest {
    age: string | undefined
    size: string | undefined
    energy: string | undefined
    independency: string | undefined
    page: number
}
interface SearchPetsUseCaseResponse {
    pets: Pet[]
}

export class SearchPetsUseCase {
    constructor(
        private petRepository: PetRepository
    ) { }

    async execute({ age, size, energy, independency, page
    }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {

        const pets = await this.petRepository.searchMany(
            { age, size, energy, independency }, page
        )

        return { pets }
    }
}