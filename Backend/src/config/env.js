const required = ["MONGO_URI", "JWT_SECRET", "REDIS_URL", "BASE_URL"];

export const validateEnvironment = () => {
    const requiredInCurrentEnvironment = process.env.NODE_ENV === "production"
        ? [...required, "API_KEY_PEPPER"]
        : required;
    const missing = requiredInCurrentEnvironment.filter((name) => !process.env[name]);
    if (missing.length) {
        throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
    }

    if (!/^https?:\/\//i.test(process.env.BASE_URL) || (process.env.NODE_ENV === "production" && !/^https:\/\//i.test(process.env.BASE_URL))) {
        throw new Error("BASE_URL must be a public https URL in production");
    }

    if (!process.env.API_KEY_PEPPER) {
        console.warn("API_KEY_PEPPER is not set; using JWT_SECRET for API-key hashing in development. Set a separate API_KEY_PEPPER before production deployment.");
    }
};
