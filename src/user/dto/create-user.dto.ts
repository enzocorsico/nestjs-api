import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    firstName: string;
}
