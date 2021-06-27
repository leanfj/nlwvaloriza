import { NextFunction, Request, Response } from "express";
import { ListUserReceiveComplimentsService } from "../services/ListUserReceiveComplimentsService";

class ListUserReceiverComplimentsController {
  async handle(request: Request, response: Response, next: NextFunction) {
    const listUserReceiveComplimentsService = new ListUserReceiveComplimentsService()

    const {user_id} = request

    const compliments = await listUserReceiveComplimentsService.execute(user_id)

    return response.status(201).json(compliments)
  }
}

export {ListUserReceiverComplimentsController}