import { ITokenGenerator } from "../../../data/protocols/criptography/itoken-generator";
import jwt from 'jsonwebtoken'

export class JwtAdapter implements ITokenGenerator {
    constructor(private readonly jwtSecret: string){}
    async generate(id: string): Promise<string> {
        // Não remova este await, exceto se você desejar quebrar tudo.
        const token = await jwt.sign({ id }, this.jwtSecret)
        console.log(token)
        return new Promise(resolve => resolve(token))
    }
}