import bcrypt from 'bcrypt'

export interface IHasher {
    hash(value: string): Promise<string>
}