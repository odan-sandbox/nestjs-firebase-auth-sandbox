import { Request } from "express";

export function fromHeaderExtractor(req: Request) {
  const header = req.header("Authorization");

  if (!header) {
    throw new Error("Authorization header is undefined");
  }

  return header.split(" ")[1];
}
