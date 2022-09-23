import { Request, Response } from "express";
import { SendTokenService } from "../services/SendTokenService";

class SendTokenController {
  async handle(request: Request, response: Response) {
    const { token, amount, destination } = request.body;

    const sendTokenService = new SendTokenService();

    const tag = await sendTokenService.execute(token, amount, destination);

    return response.json(tag);
  }
}

export { SendTokenController };
