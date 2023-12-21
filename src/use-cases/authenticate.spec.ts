import { beforeEach, describe, expect, it, test } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { AuthenticateUseCase } from './authenticate'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { InvalidCredentialsError } from './erros/invalid-credentials-error'

let organizationRepository: InMemoryOrganizationRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
    beforeEach(() => {
        organizationRepository = new InMemoryOrganizationRepository()
        sut = new AuthenticateUseCase(organizationRepository)
    })

    it.only('should be able to authenticate', async () => {
        await organizationRepository.create({
            owner: 'vitor',
            email: 'vitor@email.com',
            cep: '30371823',
            city: 'BH',
            state: 'MG',
            phone: '3191234567897',
            password_hash: await hash('12345', 6)
        })


        const { organization } = await sut.execute({
            email: 'vitor@email.com',
            password: '12345'
        })

        expect(organization.id).toEqual(expect.any(String))
    })

    it('should not be able to authenticate with wrong email', async () => {
        await expect(sut.execute({
            email: 'vitor@email.com',
            password: '12345'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        await organizationRepository.create({
            owner: 'vitor',
            email: 'vitor@email.com',
            cep: '30371823',
            city: 'BH',
            state: 'MG',
            phone: '3191234567897',
            password_hash: await hash('12345', 6)
        })

        await expect(sut.execute({
            email: 'vitor@email.com',
            password: '1234'
        })).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})