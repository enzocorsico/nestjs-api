import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { Request } from "express";
import { LoginUserDto } from "src/user/dto/login-user.dto";
import { AuthService } from "./auth.service";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("login")
    login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto);
    }

    @UseGuards(AuthGuard("jwt-refresh"))
    @Post("refresh")
    refreshTokens(@Req() req: Request) {
        const user = req.user;
        return this.authService.refreshTokens(user["sub"], user["username"], user["refreshToken"])
    }
}