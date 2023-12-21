import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'
export async function createAndAuthenticateOrganization(app: FastifyInstance, isAdmin = false) {
    const organization = await prisma.organization.create({
        data: {
            owner: 'vitor',
            email: 'vitor@email.com',
            cep: '30371823',
            city: 'BH',
            state: 'MG',
            phone: '3191234567897',
            password_hash: await hash('123456', 6)
        }
    })

    const authResponse = await request(app.server)
        .post('/sessions')
        .send({
            email: 'vitor@email.com',
            password: '123456'
        })

    const { token } = authResponse.body

    return { token }
}