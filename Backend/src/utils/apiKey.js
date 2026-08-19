import crypto from "crypto";

export const createApiKey = () => `sk_live_${crypto.randomBytes(32).toString("base64url")}`;

export const hashApiKey = (apiKey) => crypto
    .createHmac("sha256", process.env.API_KEY_PEPPER || process.env.JWT_SECRET)
    .update(apiKey)
    .digest("hex");

export const keysMatch = (providedKey, storedHash) => {
    const providedHash = Buffer.from(hashApiKey(providedKey), "hex");
    const expectedHash = Buffer.from(storedHash, "hex");
    return providedHash.length === expectedHash.length && crypto.timingSafeEqual(providedHash, expectedHash);
};
