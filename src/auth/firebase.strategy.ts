import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import admin from "firebase-admin";

import {
  FirebaseAuthStrategy,
  fromHeaderExtractor
} from "../../lib/passport-firebase-auth";

const projectId = "nestjs-firebase-auth-sandbox";

admin.initializeApp({ projectId });

@Injectable()
export class FirebaseStrategy extends PassportStrategy(FirebaseAuthStrategy) {
  public constructor() {
    super({
      extractor: fromHeaderExtractor
    });
  }

  public async validate(payload: admin.auth.DecodedIdToken) {
    if (!payload) {
      throw new UnauthorizedException();
    }

    const user = await admin.auth().getUser(payload.uid);

    return user;
  }
}
