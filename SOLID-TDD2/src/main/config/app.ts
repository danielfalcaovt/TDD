import express from 'express'
import middlewares from './middlewares'

const app = express()

middlewares(app)
// routes

export default app