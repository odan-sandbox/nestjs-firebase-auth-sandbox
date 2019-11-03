import { join } from "path";

import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { LoggerModule } from "nestjs-pino";

import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { Auth2Module } from './auth2/auth2.module';

@Module({
  imports: [
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "..", "public")
    }),
    LoggerModule.forRoot(),
    Auth2Module
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
