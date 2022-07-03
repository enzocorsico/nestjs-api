import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClasseModule } from './classe/classe.module';
import { Classe } from './classe/entities/classe.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "nestjs_api",
      entities: [Classe],
      synchronize: true
    }),
    ClasseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
