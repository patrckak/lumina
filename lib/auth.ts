import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { admin } from "better-auth/plugins";
import "dotenv/config";
export const auth = betterAuth({
  trustedOrigins: ["http://192.168.100.142:3000"],
  database: new Pool({
    connectionString: process.env.DATABASE_BETTER_URL,
  }),
  emailAndPassword: {
    enabled: true,
    // requireEmailVerification: true,
  },
  // emailVerification: {
  //             sendVerificationEmail: async ({ user, url, token }, request) => {
  //           void sendEmail({
  //               to: user.email,
  //               subject: 'Verify your email address',
  //               text: `Click the link to verify your email: ${url}`
  //           })
  //   },
  plugins: [admin()],
});
