import { NextFunction, Request, Response } from "express";
import { ListTagsService } from "../services/ListTagsService";

class ListTagsController {
  async handle (reques: Request, response: Response, next: NextFunction) {
    const listTagsService = new ListTagsService()

    const tags = await listTagsService.execute()

    return response.status(200).json(tags)
  }

}

export {ListTagsController}