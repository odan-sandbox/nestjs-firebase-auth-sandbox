import { Controller, Get, UseGuards, Request } from "@nestjs/common";
import { Auth2Guard } from "./auth2/auth2.guard";

@Controller("api")
export class AppController {
  @Get("public")
  public public() {
    return "Hello";
  }

  @Get("private")
  @UseGuards(Auth2Guard)
  public private(@Request() req: Request) {
    console.log(req);
    return "Hello!!!";
  }
}
