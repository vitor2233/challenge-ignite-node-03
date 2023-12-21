import { OrganizationRepository } from '@/repositories/organization-repository'
import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'
import { DuplicateEmailError } from './erros/duplicate-error'

interface CreateOrganizationUseCaseRequest {
    owner: string
    email: string
    cep: string
    city: string
    state: string
    phone: string
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

        const organizationWithSameEmail = await this.organizationRepository.findByEmail(email)

        if (organizationWithSameEmail) {
            throw new DuplicateEmailError()
        }

        const password_hash = await hash(password, 6)
        const organization = await this.organizationRepository.create({
            owner, email, cep, city, state, phone, password_hash
        })

        return { organization }
    }
}