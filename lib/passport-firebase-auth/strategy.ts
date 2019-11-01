import { Strategy } from "passport-strategy";
import { Request } from "express";
import { auth } from "firebase-admin";

export interface FirebaseAuthStrategyOptions {
  extractor: (req: Request) => string;
}

export class FirebaseAuthStrategy extends Strategy {
  private readonly options: FirebaseAuthStrategyOptions;
  public readonly name = "firebase-auth";
  public constructor(options: FirebaseAuthStrategyOptions) {
    super();
    this.options = options;
  }
  public authenticate(req: Request) {
    let idToken: string;
    try {
      idToken = this.options.extractor(req);
    } catch (err) {
      return this.fail({ err }, 401);
    }

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
