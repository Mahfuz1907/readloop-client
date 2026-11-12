import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONOGDB_URI as string);
const db = client.db("readloop");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 4,
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        input: true,
      },
    },
  },
});
