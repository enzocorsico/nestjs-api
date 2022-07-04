import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @ApiProperty()
    username: string;

    @IsNotEmpty()
    @ApiProperty()
    password: string;

    @IsNotEmpty()
    @ApiProperty()
    lastName: string;

    @IsNotEmpty()
    @ApiProperty()
    firstName: string;
}
