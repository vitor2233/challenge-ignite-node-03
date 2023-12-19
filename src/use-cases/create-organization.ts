import { OrganizationRepository } from '@/repositories/organization-repository'
import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'

interface CreateOrganizationUseCaseRequest {
    owner: string
    email: string
    cep: number
    city: string
    state: string
    phone: number
    password: string
}

interface CreateOrganizationUseCaseResponse {
    organization: Organization
}

export class CreateOrganizationUseCase {
    constructor(
        private organizationRepository: OrganizationRepository
    ) { }

    async execute({ owner, email, cep, city, state, phone, password
    }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {

        const password_hash = await hash(password, 6)
        const organization = await this.organizationRepository.create({
            owner, email, cep, city, state, phone, password_hash
        })

        return { organization }
    }
}