const getRandomArrayElements = (arr, n = 1) => {
  let randomArray = [];

  for (let i = 0; i < arr.length && i < n; i++) {
    const Element = getRandomIntNumber(i, arr.length - 1);
    randomArray.push(arr[Element]);
    const swap = arr[Element];
    arr[Element] = arr[i];
    arr[i] = swap;
  }

  return randomArray;
}
