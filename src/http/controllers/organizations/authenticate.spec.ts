import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it, test } from 'vitest'

describe('Authenticate (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to authenticate', async () => {
        await request(app.server)
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

        const response = await request(app.server)
            .post('/sessions')
            .send({
                email: 'vitor@email.com',
                password: '123456'
            })

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            token: expect.any(String)
        })
    })
})