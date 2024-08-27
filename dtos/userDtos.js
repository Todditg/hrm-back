export class UserDto {
    email;
    id;
    isActivated;
    firstName;
    lastName;

    constructor(model) {
        //TODO: Сюда завезти логин и какую-то информацию
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.firstName = model.firstName;
        this.lastName = model.lastName;
    }
}
