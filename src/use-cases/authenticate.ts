import { compare } from 'bcryptjs'
import { Organization } from '@prisma/client'
import { OrganizationRepository } from '@/repositories/organization-repository'
import { InvalidCredentialsError } from './erros/invalid-credentials-error'

interface AuthenticateUseCaseRequest {
    email: string
    password: string
}
interface AuthenticateUseCaseResponse {
    organization: Organization
}
export class AuthenticateUseCase {
    constructor(
        private organizationRepository: OrganizationRepository
    ) { }

    async execute({ email, password }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
        const organization = await this.organizationRepository.findByEmail(email)

        if (!organization) {
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatches = await compare(password, organization.password_hash)

        if (!doesPasswordMatches) {
            throw new InvalidCredentialsError()
        }

        return { organization }

    }
}