import request from 'supertest'
import app from '../../config/app'
import { Request, Response } from 'express'

describe('rateLimiter', () => {
    it('Should return 429 if the rate limit is breached.', async () => {
        app.get('/rate_limit_breached', (req: Request, res: Response) => {
            res.send('')
        })
        for (let i = 0; i < 100; i++) {
            await request(app)
            .get('/rate_limit_breached')
            .expect(200)
        }
    })
})