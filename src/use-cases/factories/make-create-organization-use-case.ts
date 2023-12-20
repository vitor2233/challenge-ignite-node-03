import { PrismaOrganizationRepository } from '@/repositories/prisma/prisma-organization-repository'
import { CreateOrganizationUseCase } from '../create-organization'

export function makeCreateOrganizationUseCase() {
    const organizationRepository = new PrismaOrganizationRepository()
    const createOrganizationUseCase = new CreateOrganizationUseCase(organizationRepository)

    return createOrganizationUseCase
}