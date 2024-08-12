import * as crypto from "crypto";

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Sequelize } from "sequelize-typescript";

import { UpdateUserDto, UserDto } from "../dto";
import { User } from "../entities";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly sequelize: Sequelize,
  ) {}

  async create(user: UserDto): Promise<User> {
    const hashedPassword = crypto.createHash("sha512").update(user.password).digest("hex");

    return await this.userModel.create({ ...user, password: hashedPassword });
  }

  async update(id: string, newUser: UpdateUserDto): Promise<User> {
    return await this.sequelize.transaction(async (transaction) => {
      const user = await this.userModel.findByPk(id, { transaction });

      return await user.update({ email: newUser.email }, { transaction });
    });
  }

  async changePassword(id: string, password: string): Promise<User> {
    return await this.sequelize.transaction(async (transaction) => {
      const user = await this.userModel.findByPk(id, { transaction });

      const hashedPassword = crypto.createHash("sha512").update(password).digest("hex");

      return await user.update({ password: hashedPassword }, { transaction });
    });
  }

  async confirmUserEmail(userId: string): Promise<void> {
    const user = await this.userModel.findByPk(userId);

    await user.update({ isEmailConfirmed: true });
  }

  async delete(id: string): Promise<void> {
    const user = await this.userModel.findByPk(id);

    await user.destroy();
  }

  async getById(id: string): Promise<User | null> {
    return await this.userModel.findByPk(id);
  }

  async getByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ where: { email } });
  }

  async getAll(): Promise<User[]> {
    return await this.userModel.findAll();
  }

  async getUserByEmailAndPassword(email: string, password: string): Promise<User> {
    const user = await this.getByEmail(email);

    const plainHashedPassword = crypto.createHash("sha512").update(password).digest("hex");
    if (user && user.dataValues.password === plainHashedPassword) {
      return user;
    }

    return null;
  }
}
