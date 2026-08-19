import dns from "dns/promises";
import net from "net";

const isPublicAddress = (address) => {
    const family = net.isIP(address);
    if (family === 4) {
        const [a, b] = address.split(".").map(Number);
        return !(
            a === 0 || a === 10 || a === 127 ||
            (a === 100 && b >= 64 && b <= 127) ||
            (a === 169 && b === 254) ||
            (a === 172 && b >= 16 && b <= 31) ||
            (a === 192 && b === 168) ||
            (a === 198 && (b === 18 || b === 19)) ||
            a >= 224
        );
    }

    if (family === 6) {
        const value = address.toLowerCase();
        return !(value === "::" || value === "::1" || value.startsWith("fc") || value.startsWith("fd") || value.startsWith("fe80:" ) || value.startsWith("::ffff:127."));
    }

    return false;
};

export const assertSafeTargetUrl = async (value) => {
    let target;
    try {
        target = new URL(value);
    } catch {
        throw new Error("Target URL must be a valid absolute URL");
    }

    if (!["http:", "https:"].includes(target.protocol) || target.username || target.password || target.search || target.hash) {
        throw new Error("Target URL must be an http(s) base URL without credentials, query parameters, or fragments");
    }

    if (["localhost", "localhost.localdomain"].includes(target.hostname.toLowerCase())) {
        throw new Error("Private and localhost target URLs are not allowed");
    }

    let records;
    try {
        records = await dns.lookup(target.hostname, { all: true, verbatim: true });
    } catch {
        throw new Error("Target hostname could not be resolved");
    }

    if (!records.length || records.some((record) => !isPublicAddress(record.address))) {
        throw new Error("Private, loopback, or reserved target addresses are not allowed");
    }

    return target.toString().replace(/\/$/, "");
};

export const isPublicIpAddress = isPublicAddress;
