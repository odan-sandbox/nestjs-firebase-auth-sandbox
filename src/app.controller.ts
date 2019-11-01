import { Controller, Get, UseGuards, Request } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller("api")
export class AppController {
  @Get("public")
  public public() {
    return "Hello";
  }

  @Get("private")
  @UseGuards(AuthGuard("firebase-auth"))
  public private(@Request() req: Request) {
    console.log(req);
    return "Hello!!!";
  }
}
