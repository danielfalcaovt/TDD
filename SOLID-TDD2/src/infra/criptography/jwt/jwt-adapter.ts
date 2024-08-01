import { ITokenGenerator } from "../../../data/protocols/criptography/itoken-generator";
import jwt from 'jsonwebtoken'

export class JwtAdapter implements ITokenGenerator {
    constructor(private readonly jwtSecret: string){}
    async generate(id: string): Promise<string> {
        await jwt.sign({ id }, this.jwtSecret)
        return new Promise(resolve => resolve(''))
    }
}