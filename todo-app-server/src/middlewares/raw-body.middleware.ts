import { Injectable, NestMiddleware } from "@nestjs/common";
import { raw } from "body-parser";
import { Request, Response } from "express";

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, class-methods-use-this
  use(req: Request, res: Response, next: () => any) {
    raw({ type: "application/json" })(req, res, next);
  }
}
