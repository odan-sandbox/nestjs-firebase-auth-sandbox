import { join } from "path";

import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { LoggerModule } from "nestjs-pino";

import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "..", "public")
    }),
    LoggerModule.forRoot()
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
