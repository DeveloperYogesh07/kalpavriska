import { Router } from "express";
import { RequestHandler } from "express";
import authorization from "../auth/token_validatiion";
import {
  getAllUsers,
  createNewUser,
  updateUserById,
  deleteUserById,
  login,
} from "../controller/controller";

export default class CoustomRoutes {
  private router: Router = Router();

 static publicRoutes(): Router {
    const publicRouter = Router();
    publicRouter.post("/user/login", login);
    publicRouter.post("/user", createNewUser);
    return publicRouter;
  }

  static protectedRoutes(): Router {
    const protectedRouter = Router();
    protectedRouter.use(authorization);
    protectedRouter.get("/users", getAllUsers);
    protectedRouter.patch("/user/:id", updateUserById);
    protectedRouter.delete("/user/:id", deleteUserById);
    return protectedRouter;
  }
}

