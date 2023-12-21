import { beforeEach, describe, expect, it, test } from 'vitest'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { CreateOrganizationUseCase } from './create-organization'
import { DuplicateEmailError } from './erros/duplicate-error'

let organizationRepository: InMemoryOrganizationRepository
let sut: CreateOrganizationUseCase

describe('Create Organization Use Case', () => {
    beforeEach(() => {
        organizationRepository = new InMemoryOrganizationRepository()
        sut = new CreateOrganizationUseCase(organizationRepository)
    })

    it('should be able to create an organization', async () => {

        const { organization } = await sut.execute({
            owner: 'vitor',
            email: 'vitor@email.com',
            cep: '30371823',
            city: 'BH',
            state: 'MG',
            phone: '3191234567897',
            password: '12345'
        })

        expect(organization.id).toEqual(expect.any(String))
    })

    it('should not be able to create an organization with same email', async () => {
        await sut.execute({
            owner: 'vitor',
            email: 'vitor@email.com',
            cep: '30371823',
            city: 'BH',
            state: 'MG',
            phone: '3191234567897',
            password: '12345'
        })
        await expect(sut.execute({
            owner: 'vitor',
            email: 'vitor@email.com',
            cep: '30371823',
            city: 'BH',
            state: 'MG',
            phone: '3191234567897',
            password: '12345'
        })).rejects.toBeInstanceOf(DuplicateEmailError)
    })
})