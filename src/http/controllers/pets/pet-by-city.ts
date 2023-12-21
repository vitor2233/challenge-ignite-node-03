import { makeGetPetByCityUseCase } from '@/use-cases/factories/make-get-pet-by-city-use-case'
import { makeGetPetDetailsUseCase } from '@/use-cases/factories/make-get-pet-details-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function petByCity(request: FastifyRequest, reply: FastifyReply) {
    const petByCityQuerychema = z.object({
        city: z.string(),
        page: z.coerce.number().min(1).default(1)
    })

    const { city, page } = petByCityQuerychema.parse(request.query)

    const getPetsByCityUseCase = makeGetPetByCityUseCase()

    const { pets } = await getPetsByCityUseCase.execute({ city, page })

    return reply.status(200).send({ pets })
}