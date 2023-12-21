import { DuplicateEmailError } from '@/use-cases/erros/duplicate-error'
import { makeCreateOrganizationUseCase } from '@/use-cases/factories/make-create-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const createOrganizationBodySchema = z.object({
        owner: z.string(),
        cep: z.string(),
        city: z.string(),
        state: z.string(),
        phone: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { owner, cep, city, state, phone, email, password } = createOrganizationBodySchema.parse(request.body)
    try {
        const createOrganizationUseCase = makeCreateOrganizationUseCase()

        await createOrganizationUseCase.execute({ owner, cep, city, state, phone, email, password })

        return reply.status(201).send()
    } catch (err) {
        if (err instanceof DuplicateEmailError) {
            return reply.status(401).send({ message: err.message })
        }
    }

}