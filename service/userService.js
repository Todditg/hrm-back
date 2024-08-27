import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import { MailService } from "./mailService.js";
import { TokenService } from "./tokenService.js";
import { UserDto } from "../dtos/userDtos.js";

export class UserService {
  static async registration(email, password, firstName, lastName) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw new Error("Email already exists");
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = await v4();

    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
      firstName,
      lastName
    });

    await MailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/v1/activate/${activationLink}`
    );

    const userDto = new UserDto(user);
    const tokens = TokenService.createToken({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto
    };
  }

  static async updateUser(userId, updateData) {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { ...updateData },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found");
    }

    const userDto = new UserDto(user);
    return {
      user: userDto
    };
  }

  static async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    console.log(user);
    if (!user) {
      throw new Error("Invalid activation link");
    }
    user.isActivated = true;
    await user.save();
  }

  static async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user || !user.isActivated) {
      throw new Error("User not found or not activated");
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw new Error("Invalid password");
    }

    const userDto = new UserDto(user);
    const tokens = TokenService.createToken({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
      id: userDto.id,
      message:
        "User registered successfully. Check your email for activation link."
    };
  }

  static async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  static async refresh(refreshToken) {
    if (!refreshToken) {
      throw new Error("No refresh token provided");
    }

    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenInDB = await TokenService.findToken(refreshToken);

    if (!userData || !tokenInDB) {
      throw new Error("Invalid refresh token");
    }

    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = TokenService.createToken({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  static async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }

  static async getUser(userId) {
    const user = await UserModel.findById(userId);
    const userDto = new UserDto(user);
    return { user: userDto };
  }
}
