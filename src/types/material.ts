import { type RouterInputs, type RouterOutputs } from '@/utils/api';

export type MaterialGetAllOutput = RouterOutputs['material']['getAll'];
export type MaterialGetAllOutputSingle = RouterOutputs['material']['getAll'][0];
export type MaterialCreate = RouterInputs['material']['create'];
export type MaterialUpdate = RouterInputs['material']['update'];
export type MaterialGetAllCategoriesOutput =
  RouterOutputs['material']['getAllCategories'];
export type MaterialCategoriesUpdate =
  RouterInputs['material']['updateCategories'];
export type MaterialUpdateStock = RouterInputs['material']['updateStock'];
