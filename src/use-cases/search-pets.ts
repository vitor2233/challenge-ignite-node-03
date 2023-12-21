import { PetRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'

interface SearchPetsUseCaseRequest {
    age: string | null
    size: string | null
    energy: string | null
    independency: string | null
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
        const verifiedPetObject = verifyPetObject(age, size, energy, independency)
        const pets = await this.petRepository.searchMany(
            verifiedPetObject, page
        )

        return { pets }
    }
}

function verifyPetObject(age: string | null, size: string | null, energy: string | null, independency: string | null) {
    const verifiedObject: Partial<Pet> = {};
    if (age !== null) {
        verifiedObject.age = age;
    }

    if (size !== null) {
        verifiedObject.size = size;
    }

    if (energy !== null) {
        verifiedObject.energy = energy;
    }

    if (independency !== null) {
        verifiedObject.independency = independency;
    }
    return verifiedObject;
}