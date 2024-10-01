import { Schema, model } from "mongoose";

const VacancySchema = new Schema({
    name: { type: String, unique: true, required: true }, // Наименование вакансии
    pos: { type: String, required: true }, // Должность
    descriptionRequirements: { type: String }, // Описание требований к кандидату
    descriptionResponsibilities: { type: String }, // Описание обязанностей
    descriptionConditions: { type: String }, // Описание условий работы
    hrManagers: { type: [String] }, // Сотрудники кадровой службы
    skills: [{
        name: { type: String }, // Название навыка
        weight: { type: Number } // Вес навыка
    }], // Список навыков с весами
    interviewHistory: { type: [String], default: [] }, // История проведения собеседований
    salary: { type: Number }, // Зарплата (опционально)
    experience: { type: Number } // Опыт работы (опционально)
});


// name: string; // Наименование вакансии
// pos: string; // Должность
// descriptionRequirements: string; // Описание требований к кандидату
// descriptionResponsibilities: string; // Описание обязанностей
// descriptionConditions: string; // Описание предлагаемых условий работы
// hrManagers: string[]; // Сотрудники кадровой службы, ответственные за вакансию
// skills: { name: string; weight: number }[]; // Список навыков с весами для оценки
// interviewHistory: string[]; // История проведения собеседований кандидатов
// salary?: number; // Зарплата (опционально)
// experience?: number; // Опыт работы (опционально)
export default model("Vacancy", VacancySchema);
