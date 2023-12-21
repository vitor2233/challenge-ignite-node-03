export class DuplicateEmailError extends Error {
    constructor() {
        super('Email already exists')
    }
}