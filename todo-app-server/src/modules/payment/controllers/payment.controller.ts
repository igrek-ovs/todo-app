import { Controller, Post, Query, RawBodyRequest, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { AuthGuard } from "../../auth/guards";
import { CheckoutSessionQueryDto } from "../dto";
import { PaymentService } from "../services";

@ApiTags("Payment")
@Controller("payment")
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(AuthGuard)
  @Post("create-checkout-session")
  async createCheckoutSession(@Query() query: CheckoutSessionQueryDto): Promise<{ url: string }> {
    const { taskId, amount } = query;
    return await this.paymentService.processPayment(taskId, amount);
  }

  @Post("webhook")
  async handleWebhook(@Req() req: RawBodyRequest<Request>) {
    const sig = req.headers["stripe-signature"];
    return await this.paymentService.webhook(sig, req.body);
  }
}
