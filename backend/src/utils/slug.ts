import { randomBytes } from "crypto";

export function generateSlug(length = 8):string {
    return randomBytes(length).toString("hex").slice(0, length);
}