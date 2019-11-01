import { Strategy } from "passport-strategy";
import { Request } from "express";
import { auth } from "firebase-admin";

export interface FirebaseAuthStrategyOptions {
  extractor: (req: Request) => string;
}

export class FirebaseAuthStrategy extends Strategy {
  private readonly options: FirebaseAuthStrategyOptions;
  public constructor(options: FirebaseAuthStrategyOptions) {
    super();
    this.options = options;
  }
  public authenticate(req: Request) {
    const idToken = this.options.extractor(req);

    auth()
      .verifyIdToken(idToken)
      .then(decodedIdToken => {
        this.success(decodedIdToken);
      })
      .catch(err => {
        this.fail({ err }, 401);
      });
  }
}
