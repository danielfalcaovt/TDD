import { PgHelper } from "../infra/db/helpers/pg-helper";
import env from "./config/env";

PgHelper.connect().then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.Port, () => {
        console.log(`Server is running at the ${env.Port}.`)
    })
})
.catch(console.error)