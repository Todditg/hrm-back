import jwt from "jsonwebtoken";
import tokenModel from "../models/tokenModel.js";
export class TokenService {
  static createToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "30m"
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d"
    });
    return { accessToken, refreshToken };
  }

  static validateAccessToken(accessToken) {
    try {
      const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  static validateRefreshToken(refreshToken) {
    try {
      const userData = jwt.verify(accessToken, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  static async findToken(refreshToken) {
    const tokenData = await tokenModel.findOne({ refreshToken });
    return tokenData;
  }

  static async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({ userId: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await tokenModel.create({ userId: userId, refreshToken });
    return token;
  }

  static async removeToken(refreshToken) {
    const tokenData = await tokenModel.deleteOne({ refreshToken });
    return tokenData
  }

}
