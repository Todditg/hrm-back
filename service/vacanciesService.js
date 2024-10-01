import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import VacanciesModel from "../models/vacanciesModel.js";

export class VacanciesService {
  static async createVacancy(
    name,
    pos,
    department,
    description,
    skills,
    salary,
    experience
  ) {
    const vacancy = await VacanciesModel.create({
      name,
      pos,
      department,
      description,
      skills,
      salary,
      experience
    });

    return {
      vacancy: vacancy
    };
  }

  static async getAllVacancies() {
    const vacancies = await VacanciesModel.find({});
    return vacancies;
  }

  static async updateVacancy(userId, updateData) {
    const vacancyUpdated = await VacanciesModel.findByIdAndUpdate(
      userId,
      { ...updateData },
      { new: true }
    );

    return { vacancy: vacancyUpdated };
  }
}
