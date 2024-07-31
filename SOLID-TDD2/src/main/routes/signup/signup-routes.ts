import { Router } from "express";
import { makeSignUpController } from "../../factory/signup/signup-controller";
import { routeAdapter } from "../../adapter/route-adapter";

export default (router: Router) => {
    const signupController = makeSignUpController()
    router.post('/signup', routeAdapter(signupController))
}