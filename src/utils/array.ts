/**
 * Function that returns the elements of the base array that don't exist in the
 * exclude array.
 *
 * @example ```tsx
 * const array = arrayDiff(['1', '2', '3'], ['1', '2', '4'])
 * // Returns ['3'].
 * ```
 *
 * @param baseArray The array which will have elements returned from.
 * @param compareArray The array which the baseArray will be compared to.
 * @returns An array of elements that exist in the baseArray but not the
 * compareArray.
 */
export function arrayDiff<T>(baseArray: T[], compareArray: T[]) {
  return baseArray.filter((el) => !compareArray.includes(el));
}

/**
 * Function that returns the elements of the base array that also exist in the
 * exclude array.
 *
 * @example ```tsx
 * const array = arrayIntersect(['1', '2', '3'], ['1', '2', '4'])
 * // Returns ['1', '2'].
 * ```
 *
 * @param baseArray The array which will have elements returned from.
 * @param compareArray The array which the baseArray will be compared to.
 * @returns An array of elements that exist in both the baseArray and the
 * compareArray.
 */
export function arrayIntersect<T>(baseArray: T[], compareArray: T[]) {
  return baseArray.filter((el) => compareArray.includes(el));
}

