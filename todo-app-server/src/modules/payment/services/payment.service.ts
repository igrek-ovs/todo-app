import { BadRequestException, HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Stripe } from "stripe";

import { TaskService } from "../../task/services";
import { CheckoutEventTypes } from "../enums";

@Injectable()
export class PaymentService {
  private readonly stripe;

  constructor(private readonly taskService: TaskService, private readonly configService: ConfigService) {
    this.stripe = new Stripe(configService.get("STRIPE_SECRET_KEY"), {
      apiVersion: "2023-08-16",
    });
  }

  async processPayment(taskId: string, amount: number): Promise<{ url: string }> {
    const task = await this.taskService.getById(taskId);

    if (!task) {
      throw new NotFoundException("Task not exists");
    }

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: amount * 100,
            product_data: {
              name: "Task donating",
            },
          },
          quantity: 1,
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
      metadata: {
        taskId,
        amount,
      },
      success_url: `${this.configService.get("CLIENT_URL")}/checkout-success`,
      cancel_url: `${this.configService.get("CLIENT_URL")}/checkout-error`,
    });
    return { url: session.url };
  }

  async webhook(header: Headers, body: ReadableStream<Uint8Array>): Promise<void> {
    const webhookSecret = this.configService.get("WEBHOOK_SECRET");
    let event;

    try {
      event = this.stripe.webhooks.constructEvent(body, header, webhookSecret);
    } catch (error) {
      throw new BadRequestException("Webhook Error");
    }

    switch (event.type) {
      case CheckoutEventTypes.CHECKOUT_SESSION_COMPLETED: {
        const session = event.data.object;
        const { taskId, amount } = session.metadata;
        await this.taskService.updateProgress(taskId, Number(amount));
        break;
      }
      case CheckoutEventTypes.CHECKOUT_SESSION_EXPIRED: {
        const session = event.data.object;
        const error = session.error;
        throw new HttpException(error, 400);
      }
      default:
        throw new NotFoundException("Service Error");
    }
  }
}
