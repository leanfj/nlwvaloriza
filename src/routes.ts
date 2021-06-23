import { Router } from "express";
import { CreateDateColumn } from "typeorm";
import { CreateUserController } from "./controllers/CreateUserController";

const router = Router()

const createUserController = new CreateUserController()

router.post("/users", createUserController.handle)

export {router}