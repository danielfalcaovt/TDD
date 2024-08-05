import { PgHelper } from "../../../infra/db/helpers/pg-helper"
import app from "../../config/app"
import request from 'supertest'

describe('SignUp Routes', () => {
    beforeAll(async () => {
        PgHelper.connect().then(() => {
            return
        })
    })
    beforeEach(async () => {
        PgHelper.query('DELETE FROM users').then(() => {
            return
        })
    })
    afterAll(async () => {
        PgHelper.disconnect().then(() => {
            return
        })
    })
    it('Should return an account on ok', async () => {
        const response = await request(app)
            .post('/api/signup')
            .send({
                name: 'valid_name',
                email: 'valid_mail@mail.com',
                password: 'ValidPassword@',
                confirmPassword: 'ValidPassword@'
            })
            console.log(response)
            expect(response.statusCode).toBe(200)
    })
})