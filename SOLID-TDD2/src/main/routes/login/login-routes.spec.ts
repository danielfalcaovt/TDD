import { hash } from "bcrypt"
import { PgHelper } from "../../../infra/db/helpers/pg-helper"
import app from "../../config/app"
import request from 'supertest'

describe('SignUp Routes', () => {
    const user = {
        email: 'valid_mail@mail.com',
        password: 'ValidPassword@'
    }
    beforeAll(async () => {
        PgHelper.connect().then(() => {
            return
        })
        const hashedPassword = await hash(user.password, 12)
        await PgHelper.query('INSERT INTO users(name, email, password) VALUES($1, $2, $3)', ['valid_name', user.email, hashedPassword])
    })
    afterEach(async () => {
        PgHelper.query('DELETE FROM users').then(() => {
            return
        })
    })
    afterAll(async () => {
        PgHelper.disconnect().then(() => {
            return
        })
    })
    it('Should return 200 on ok', async () => {
        const response = await request(app)
        .post('/api/login')
        .send({
            email: user.email,
            password: user.password
        })
        expect(response.statusCode).toBe(200)
    })
})