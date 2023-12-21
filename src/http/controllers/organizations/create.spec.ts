import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it, test } from 'vitest'

describe('Create (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create', async () => {
        const response = await request(app.server)
            .post('/organizations')
            .send({
                owner: 'vitor',
                email: 'vitor@email.com',
                cep: '30371823',
                city: 'BH',
                state: 'MG',
                phone: '3191234567897',
                password: '123456'
            })

        expect(response.statusCode).toEqual(201)
    })
})