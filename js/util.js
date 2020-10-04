'use strict';

(() => {

  const getRandomArrayElements = (arr, n = 1) => {
    const randomArray = [];

    for (let i = 0; i < arr.length && i < n; i++) {
      const element = window.util.getRandomIntNumber(i, arr.length - 1);
      randomArray.push(arr[element]);
      const swap = arr[element];
      arr[element] = arr[i];
      arr[i] = swap;
    }

    return randomArray;
  };

  const getRandomIntNumber = (min = 0, max = 100) => {
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  window.util = {
    getRandomArrayElements,
    getRandomIntNumber,
  };

})();
