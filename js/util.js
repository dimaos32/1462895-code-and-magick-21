'use strict';

(() => {

  const getRandomIntNumber = (min = 0, max = 100) => {
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  const getRandomArrayElements = (arr, n = 1) => {
    let copySource = arr.slice();
    let randomArray = [];

    for (let i = 0; i < copySource.length && i < n; i++) {
      const element = getRandomIntNumber(i, copySource.length - 1);
      randomArray.push(copySource[element]);
      const swap = copySource[element];
      copySource[element] = copySource[i];
      copySource[i] = swap;
    }

    return randomArray;
  };

  const debounce = (cb, interval) => {
    let lastTimeout = null;

    return function (...args) {

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(() => {
        cb.apply(null, [...args]);
      }, interval);
    };
  };

  window.util = {
    getRandomIntNumber,
    getRandomArrayElements,
    debounce,
  };

})();
