import { Organization, Prisma } from "@prisma/client";
import { OrganizationRepository } from "../organization-repository";


export class InMemoryOrganizationRepository implements OrganizationRepository {
    public items: Organization[] = []
    async create(organization: Prisma.PetCreateInput): Promise<Organization> {
        throw new Error("Method not implemented.");
    }
    async findByEmail(email: string): Promise<Organization | null> {
        throw new Error("Method not implemented.");
    }

}