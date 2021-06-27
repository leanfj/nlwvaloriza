import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUserReceiverComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListUsersController } from "./controllers/ListUsersController";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAutheticated } from "./middlewares/ensureAuthenticated";

const router = Router()

const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authenticateUserController = new AuthenticateUserController()
const createComplimentController = new CreateComplimentController()
const listeUserSendComplimentsController = new ListUserSendComplimentsController()
const listUserReceiverComplimentsController = new ListUserReceiverComplimentsController()
const listTagsController = new ListTagsController()
const listUsersController = new ListUsersController()

router.post("/users", createUserController.handle)
router.get("/users", ensureAutheticated, listUsersController.handle)
router.post("/tags", ensureAutheticated, ensureAdmin,  createTagController.handle)
router.get("/tags", ensureAutheticated, listTagsController.handle)
router.post("/login", authenticateUserController.handle)
router.post("/compliments", ensureAutheticated, createComplimentController.handle)
router.get("/users/compliments/send", ensureAutheticated, listeUserSendComplimentsController.handle)
router.get("/users/compliments/receive", ensureAutheticated, listUserReceiverComplimentsController.handle)

export {router}