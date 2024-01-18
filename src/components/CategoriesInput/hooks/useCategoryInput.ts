import { useCreateMaterialCategory } from '@/hooks/material';
import { useCreateProductCategory } from '@/hooks/product';
import { type AppRouter } from '@/server/api/root';
import {
  type MaterialGetAllCategoriesOutput,
  type ProductGetAllCategoriesOutput,
} from '@/types';
import { type TRPCClientErrorLike } from '@trpc/client';
import { type UseTRPCQueryResult } from '@trpc/react-query/shared';

type MaterialCategories = UseTRPCQueryResult<
  MaterialGetAllCategoriesOutput,
  TRPCClientErrorLike<AppRouter>
>;
type ProductCategories = UseTRPCQueryResult<
  ProductGetAllCategoriesOutput,
  TRPCClientErrorLike<AppRouter>
>;

export enum UseCategoryInputOwner {
  MATERIAL,
  PRODUCT,
}

export default function useCategoryInput(
  queryFn: MaterialCategories | ProductCategories,
  owner: UseCategoryInputOwner
) {
  const categoriesQuery = queryFn;
  const options = categoriesQuery.data?.map((category) => ({
    label: category.category.name,
    value: category.id,
  }));

  const { query: createCategoryQuery } =
    owner === UseCategoryInputOwner.MATERIAL
      ? useCreateMaterialCategory()
      : useCreateProductCategory();

  function onCreate(input: string) {
    createCategoryQuery.mutate({ name: input });
  }

  return {
    options,
    onCreate,
  };
}
