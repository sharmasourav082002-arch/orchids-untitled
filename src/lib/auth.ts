import { betterAuth } from "better-auth";
import { pgAdapter } from "better-auth/adapters/pg";
import { Pool } from "pg";

export const auth = betterAuth({
    database: pgAdapter(new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
    })),
    baseURL: process.env.BETTER_AUTH_URL || process.env.URL || process.env.NEXT_PUBLIC_APP_URL,
    emailAndPassword: {
        enabled: true
    }
});
