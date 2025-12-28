import { betterAuth } from "better-auth";
import { pgAdapter } from "better-auth/adapters/pg";
import { Pool } from "pg";

export const auth = betterAuth({
    database: pgAdapter(new Pool({
        connectionString: process.env.DATABASE_URL
    })),
    emailAndPassword: {
        enabled: true
    }
});
