import test from "node:test";
import assert from "node:assert/strict";
import parseWindow from "../src/utils/windowParser.js";
import { createApiKey, hashApiKey, keysMatch } from "../src/utils/apiKey.js";
import { assertSafeTargetUrl } from "../src/utils/targetUrl.js";

process.env.API_KEY_PEPPER = "test-only-pepper";

test("accepts the UI's seconds-based rate-limit window", () => {
    assert.equal(parseWindow(60), 60);
    assert.equal(parseWindow("5m"), 300);
    assert.equal(parseWindow("1h"), 3600);
    assert.equal(parseWindow("nope"), null);
    assert.equal(parseWindow("2d"), null);
});

test("API keys are high entropy and are verified without storing the key", () => {
    const key = createApiKey();
    const hash = hashApiKey(key);
    assert.match(key, /^sk_live_/);
    assert.notEqual(hash, key);
    assert.equal(keysMatch(key, hash), true);
    assert.equal(keysMatch(`${key}x`, hash), false);
});

test("private target addresses are rejected before they can be proxied", async () => {
    await assert.rejects(assertSafeTargetUrl("http://127.0.0.1/admin"), /Private, loopback, or reserved/);
});
