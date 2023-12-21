import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-user'
import { hash } from 'bcryptjs'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it, test } from 'vitest'

describe('Create (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create pet', async () => {
        const { token } = await createAndAuthenticateOrganization(app, true)

        const organization = await prisma.organization.create({
            data: {
                owner: 'vitor',
                email: 'vitor2@email.com',
                cep: '30371823',
                city: 'BH',
                state: 'MG',
                phone: '3191234567897',
                password_hash: await hash('123456', 6)
            }
        })

        const response = await request(app.server)
            .post('/pets')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'dog',
                about: 'good dog',
                age: 'New',
                size: 'Small',
                energy: 'a lot',
                independency: 'low',
                environment: 'Big house',
                requirements: ['toy1', 'toy2'],
                organization_id: organization.id
            })

        expect(response.statusCode).toEqual(201)
    })
})