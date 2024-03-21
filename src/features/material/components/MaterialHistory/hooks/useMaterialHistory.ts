import { useMaterial } from "@/features/material/hooks";
import { api } from "@/utils/api";

export default function useMaterialHistory() {
  const material = useMaterial();

  const query = api.material.getHistory.useQuery({ id: material.id });

  return { material, query };
}
