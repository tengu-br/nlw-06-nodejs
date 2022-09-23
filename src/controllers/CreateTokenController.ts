import { Request, Response } from "express";
import { CreateTokenService } from "../services/CreateTokenService";

class CreateTokenController {
  async handle(request: Request, response: Response) {
    const { name, supply, symbol, decimals } = request.body;

    const createTokenService = new CreateTokenService();

    const tag = await createTokenService.execute(name, supply, symbol, decimals);

    return response.json(tag);
  }
}

export { CreateTokenController };
