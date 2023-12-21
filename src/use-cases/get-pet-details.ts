import { PetDetails, PetRepository } from '@/repositories/pet-repository'
import { ResourceNotFoundError } from './erros/resource-not-found-error'

interface GetPetDetailsUseCaseRequest {
    id: string
}

interface GetPetDetailsUseCaseResponse {
    pet: PetDetails
}

export class GetPetDetailsUseCase {
    constructor(
        private petRepository: PetRepository
    ) { }

    async execute({ id
    }: GetPetDetailsUseCaseRequest): Promise<GetPetDetailsUseCaseResponse> {

        const pet = await this.petRepository.getPetDetailsById(
            id
        )

        if (!pet)
            throw new ResourceNotFoundError()

        return { pet }
    }
}