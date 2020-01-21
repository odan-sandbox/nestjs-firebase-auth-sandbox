import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger
} from "@nestjs/common";
import { Request } from "express";
import { config } from "node-config-ts";
import admin from "firebase-admin";

const projectId = config.projectId;
admin.initializeApp({ projectId });

@Injectable()
export class Auth2Guard implements CanActivate {
  private logger: Logger = new Logger("Auth2");
  public async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    const idToken = this.getIdToken(request);
    this.logger.log("poyo");

    const decodedIdToken = await admin
      .auth()
      .verifyIdToken(idToken)
      .catch(e => {
        this.logger.log(e);
        throw new UnauthorizedException();
      });

    this.logger.log(decodedIdToken);

    // getUser にするには firebase の credential が必要
    // const user = await admin.auth().getUser(decodedIdToken.uid);
    //request["user"] = user;

    // decodedIdToken と getUser の返り値のどっちを使うべきかはプロジェクト次第
    request["user"] = decodedIdToken;

    return true;
  }

  private getIdToken(request: Request) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException();
    }

    const [bearer, idToken] = authHeader.split(" ");

    if (!bearer || bearer.toLowerCase() !== "bearer") {
      throw new UnauthorizedException();
    }

    if (!idToken) {
      throw new UnauthorizedException();
    }

    return idToken;
  }
}
