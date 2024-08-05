import { Router } from "express";
import { routeAdapter } from "../../adapter/route-adapter";
import { makeLoginController } from "../../factory/login/login-controller";

export default (router: Router) => {
    const loginController = makeLoginController()
    router.post('/login', routeAdapter(loginController))
}