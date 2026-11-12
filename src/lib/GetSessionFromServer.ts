import { headers } from "next/headers";
import { auth } from "./auth";

export const GetSessionFromServer = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user;
};
