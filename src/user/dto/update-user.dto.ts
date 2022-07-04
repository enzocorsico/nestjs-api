import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateUserDto {
    @IsNotEmpty()
    @ApiProperty()
    username: string;

    @IsNotEmpty()
    @ApiProperty()
    lastName: string;

    @IsNotEmpty()
    @ApiProperty()
    firstName: string;
}
