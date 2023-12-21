import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it, test } from 'vitest'

describe('Refresh Token (e2e)', () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to refresh a token', async () => {
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

        const authResponse = await request(app.server)
            .post('/sessions')
            .send({
                email: 'vitor@email.com',
                password: '123456'
            })

        const cookies = authResponse.get('Set-Cookie')

        const response = await request(app.server)
            .patch('/token/refresh')
            .set('Cookie', cookies)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            token: expect.any(String)
        })
        expect(response.get('Set-Cookie')).toEqual([
            expect.stringContaining('refreshToken='),
        ])
    })
})