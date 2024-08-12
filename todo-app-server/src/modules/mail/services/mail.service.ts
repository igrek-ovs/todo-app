import { Injectable } from "@nestjs/common";
// import { ConfigService } from "@nestjs/config";
// import sgMail from "@sendgrid/mail";

import { MailTemplate } from "../types";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class MailService {
  constructor(
    // private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {
    // sgMail.setApiKey(this.configService.get("SENDGRID_API_KEY"));
  }

  async send(template: MailTemplate): Promise<void> {
    await this.mailerService.sendMail(template);
  }

  generateVerificationCode(): string {
    const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const codeLength = 6;

    let result = "";

    for (let i = 0; i < codeLength; i += 1) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }
}
