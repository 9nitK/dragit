/**
 * Swaps the positions of two elements in an array and updates their position properties.
 *
 * @template T - The type of elements in the array, which must include a 'position' property.
 * @param {T[]} array - The original array of elements.
 * @param {number} index1 - The index of the first element to swap.
 * @param {number} index2 - The index of the second element to swap.
 * @returns {T[]} A new array with the swapped elements and updated positions.
 */
export const swapPositionsAndReturnNewArray = <T extends { position: number }>(
  array: T[],
  index1: number,
  index2: number
): T[] => {
  // Create a copy of the array to avoid mutating the original array
  const newArray = [...array];

  // Swap the elements
  [newArray[index1], newArray[index2]] = [newArray[index2], newArray[index1]];

  // Update the position of the elements
  newArray[index1].position = index1;
  newArray[index2].position = index2;

  return newArray;
};

/**
 * Creates a debounced function that delays invoking `fn` until after `ms` milliseconds have elapsed
 * since the last time the debounced function was invoked.
 *
 * @param fn The function to debounce.
 * @param ms The number of milliseconds to delay; default is 300ms.
 * @returns A new debounced function.
 */
export const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
