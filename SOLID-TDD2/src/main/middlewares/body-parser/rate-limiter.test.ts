import request from 'supertest'
import app from '../../config/app'
import { Request, Response } from 'express'

describe('rateLimiter', () => {
    it('Should allow request within limit', async () => {
        app.get('/rate_limit_test', (req: Request, res: Response) => {
            res.send('')
        })
        for (let i = 0; i < 25; i++) {
            const response = await request(app).get('/rate_limit_test')
            expect(response.statusCode).toBe(200)
        }
    })
})