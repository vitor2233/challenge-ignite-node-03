import { FastifyInstance } from 'fastify'
import { details } from './details'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { search } from './search'
import { create } from './create'
import { petByCity } from './pet-by-city'

export async function petRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.get('/pets/:id/details', details)
    app.get('/pets/search', search)
    app.get('/pets/city', petByCity)
    app.post('/pets', create)
}