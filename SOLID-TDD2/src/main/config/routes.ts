import { Router, Express } from "express"
import fs from 'fs'

export default (app: Express): void => {
    const routes = Router()
    app.use('/api', routes)
    fs.readdirSync(`${__dirname}/../routes/signup`).map(async file => {
        console.log(file)
    })
}