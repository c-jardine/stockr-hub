import { type AppRouter } from '@/server/api/root';
import { type Category } from '@prisma/client';
import { type TRPCClientErrorLike } from '@trpc/client';
import { type UseTRPCQueryResult } from '@trpc/react-query/shared';

interface CategoryData {
  id: string;
  category: Category;
}

type ApiFnType<T> = {
  useQuery: () => UseTRPCQueryResult<T[], TRPCClientErrorLike<AppRouter>>;
};

export default function useCategoryOptions<T extends CategoryData>(
  queryFn: ApiFnType<T>
) {
  const query = queryFn.useQuery();

  const options = query.data?.map((option) => ({
    label: option.category.name,
    value: option.id,
  }));

  return { options };
}
