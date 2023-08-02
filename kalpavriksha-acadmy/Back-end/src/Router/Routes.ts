import  { Router } from "express";
import express = require("express")
import { RequestHandler } from "express";
import authorization from "../auth/token_validatiion";
import {
  getAllUsers,
  createNewUser,
  updateUserById,
  deleteUserById,
  login,
} from "../controller/controller";

const router: Router = express.Router();

router.get("/users", authorization as RequestHandler, getAllUsers as RequestHandler);

router.post("/user",  createNewUser as RequestHandler);

router.patch("/user/:id", authorization as RequestHandler, updateUserById as RequestHandler);

router.delete("/user/:id", authorization as RequestHandler, deleteUserById as RequestHandler);

router.post("/user/login", login as RequestHandler);

export default router;

