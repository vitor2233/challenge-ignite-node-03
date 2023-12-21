import { makeSearchPetsUseCase } from '@/use-cases/factories/make-search-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
    const searchPetQuerychema = z.object({
        age: z.string().nullable().default(null),
        size: z.string().nullable().default(null),
        energy: z.string().nullable().default(null),
        independency: z.string().nullable().default(null),
        page: z.coerce.number().min(1).default(1)
    })

    const { age, size, energy, independency, page } = searchPetQuerychema.parse(request.query)

    const searchPetsUseCase = makeSearchPetsUseCase()

    const { pets } = await searchPetsUseCase.execute({ age, size, energy, independency, page })

    return reply.status(200).send({ pets })
}