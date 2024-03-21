import { api } from "@/utils/api";

export default function useUser() {
  const query = api.user.getUser.useQuery();

  return query;
}
