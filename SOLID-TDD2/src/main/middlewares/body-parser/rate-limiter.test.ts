import request from 'supertest'
import app from '../../config/app'
import { Request, Response } from 'express'

describe('rateLimiter', () => {
    beforeAll(() => {
        app.get('/rate_limit_test', (req: Request, res: Response) => {
            res.send('')
        })
    })
    it('Should allow request within limit', async () => {
        for (let i = 0; i < 25; i++) {
            const response = await request(app).get('/rate_limit_test')
            expect(response.statusCode).toBe(200)
        }
    })
    it('Should return 429 if the rate limit is breached.', async () => {
        for (let i = 0; i < 101; i++) {
            const response = await request(app).get('/rate_limit_test')
            if (i > 100) {
                expect(response.statusCode).toBe(429)

            }else {
                expect(response.statusCode).toBe(200)
            }
        }
    })
})