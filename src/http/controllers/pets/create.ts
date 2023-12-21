import { makeCreateOrganizationUseCase } from '@/use-cases/factories/make-create-organization-use-case'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createPetBodySchema = z.object({
        name: z.string(),
        about: z.string(),
        age: z.string(),
        size: z.string(),
        energy: z.string(),
        independency: z.string(),
        environment: z.string(),
        requirements: z.array(z.string()),
        organization_id: z.string().uuid(),
    })

    const { name, about, age, size, energy, independency, environment, requirements, organization_id } = createPetBodySchema.parse(request.body)

    const createPetUseCase = makeCreatePetUseCase()

    await createPetUseCase.execute({ name, about, age, size, energy, independency, environment, requirements, organization_id })

    return reply.status(201).send()
}