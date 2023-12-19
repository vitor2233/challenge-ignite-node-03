import { Organization, Prisma } from "@prisma/client";
import { OrganizationRepository } from "../organization-repository";
import { randomUUID } from "crypto";


export class InMemoryOrganizationRepository implements OrganizationRepository {
    public items: Organization[] = []
    async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
        const organization: Organization = {
            id: data.id ?? randomUUID(),
            owner: data.owner,
            cep: data.cep,
            city: data.city,
            state: data.state,
            email: data.email,
            password_hash: data.password_hash,
            phone: data.phone,
            created_at: new Date(),
        }
        this.items.push(organization)

        return organization
    }
    async findByEmail(email: string): Promise<Organization | null> {
        throw new Error("Method not implemented.");
    }

}