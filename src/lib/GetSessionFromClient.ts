import { useSession } from "./auth-client";

export const GetSessionFromClient = () => {
  const { data } = useSession();
  return data?.user;
};
