import { type RouterInputs, type RouterOutputs } from '@/utils/api';

export type ProductGetAllOutput = RouterOutputs['product']['getAll'];
export type ProductGetAllOutputSingle = RouterOutputs['product']['getAll'][0];
export type ProductCreate = RouterInputs['product']['create'];
export type ProductUpdate = RouterInputs['product']['update'];
export type ProductGetAllCategoriesOutput =
  RouterOutputs['product']['getAllCategories'];