import { IsNotEmpty } from "class-validator";

export class UpdateUserDto {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    firstName: string;
}
