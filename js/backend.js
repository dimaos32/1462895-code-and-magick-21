'use strict';

(() => {

  const URL_LOAD = `https://21.javascript.pages.academy/code-and-magick/data`;
  const URL_UPLOAD = `https://21.javascript.pages.academy/code-and-magick`;

  const StatusCode = {
    OK: 200
  };
  const TIMEOUT = 10000;

  const load = (onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.timeout = TIMEOUT;

    xhr.open(`GET`, URL_LOAD);
    xhr.send();

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ${xhr.status}  ${xhr.statusText}`);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ${xhr.timeout / 1000} с`);
    });
  };

  const upload = (data, onSuccess) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.open(`POST`, URL_UPLOAD);
    xhr.send(data);

    xhr.addEventListener(`load`, () => {
      onSuccess(xhr.response);
    });
  };

  window.backend = {
    load,
    upload,
  };

})();
