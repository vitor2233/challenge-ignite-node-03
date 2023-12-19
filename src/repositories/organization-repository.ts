import { Organization, Prisma } from "@prisma/client";


export interface OrganizationRepository {
    create(organization: Prisma.PetCreateInput): Promise<Organization>
    findByEmail(email: string): Promise<Organization | null>
}