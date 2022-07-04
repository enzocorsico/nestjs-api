import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async login(loginUserDto: LoginUserDto) {
        const user = await this.userService.findByUsername(loginUserDto.username);
        if (!user) {
            throw new UnauthorizedException("User does not exist");
        }
        if (!bcrypt.compareSync(loginUserDto.password, user.password)) {
            throw new UnauthorizedException("Invalid password");
        }

        return this.signUser(user);
    }

    async signUser(user: User) {
        const tokens = this.getTokens(user.id, user.username);
        return tokens;
    }

    getTokens(userId: number, username: string) {
        const accessToken = this.jwtService.sign({
            sub: userId,
            username
        }, {
            secret: process.env.JWT_SECRET,
            expiresIn: 20
        })
        
        const refreshToken = this.jwtService.sign({
            sub: userId,
            username
        }, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: 60 * 60 * 24 * 7
        })

        this.updateDbRefreshToken(userId, refreshToken);
        return { accessToken, refreshToken };
    }

    async updateDbRefreshToken(userId: number, refreshToken: string) {
        const hashRefreshToken = bcrypt.hashSync(refreshToken, 10);
        return await this.userService.updateRefreshToken(userId, hashRefreshToken);
    }

    async refreshTokens(userId: number, username:string, refreshToken: string) {
        const user = await this.userService.findOne(userId);

        if (!user || !user.refreshToken) {
            throw new UnauthorizedException("User does not exist");
        }

        if (!bcrypt.compareSync(refreshToken, user.refreshToken)) {
            throw new UnauthorizedException("Acces Denied");
        }

        return this.getTokens(userId, username);
    }
}
