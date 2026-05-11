import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getDB } from "./mongodb";

const db = await getDB();

const baseURL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_AUTH_DEV_BASE_URL
    : process.env.NEXT_PUBLIC_AUTH_BASE_URL;

export const auth = betterAuth({
  baseURL,
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      phone: {
        type: "string",
        required: false,
      },
      image: {
        type: "string",
        required: false,
        defaultValue: "",
      },
      role: {
        type: "string",
        required: true,
        defaultValue: "user",
      },
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7,
  },
});
