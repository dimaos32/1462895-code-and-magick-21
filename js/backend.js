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
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ${xhr.timeout / 1000} с`);
    });
  };

  const send = (data, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.timeout = TIMEOUT;

    xhr.open(`POST`, URL_UPLOAD);
    xhr.send(data);

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);

      console.log(xhr.status);
      console.log(xhr.statusText);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ${xhr.timeout / 1000} с`);
    });
  };

  const onError = (message) => {
    const node = document.createElement(`div`);

    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = message;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  window.backend = {
    load,
    send,
    onError,
  };

})();
