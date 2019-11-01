import { Request } from "express";

export function fromHeaderExtractor(req: Request) {
  const header = req.header("Authorization");
  return header.split(" ")[1];
}
