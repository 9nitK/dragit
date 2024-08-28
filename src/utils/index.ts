export const swapPositionsAndReturnNewArray = <T extends { position: number }>(
  array: T[],
  index1: number,
  index2: number
): T[] => {
  // Create a copy of the array to avoid mutating the original array
  let newArray = [...array];

  // Swap the elements
  [newArray[index1], newArray[index2]] = [newArray[index2], newArray[index1]];

  // Update the position of the elements
  newArray[index1].position = index1;
  newArray[index2].position = index2;

  return newArray;
};

export const debounce = (fn: Function, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
