import { Router, Express } from "express"
import fs from 'fs'

export default (app: Express): void => {
    const routes = Router()
    app.use('/api', routes)
    fs.readdirSync(`${__dirname}/../routes/signup`).map(async file => {
        if (!file.includes('.spec.')) {
            (await import(`../routes/signup/${file}`)).default(routes)
        }
    })
    fs.readdirSync(`${__dirname}/../routes/login`).map(async file => {
        if (!file.includes('.spec.')) {
            (await import(`../routes/login/${file}`)).default(routes)
        }
    })
}