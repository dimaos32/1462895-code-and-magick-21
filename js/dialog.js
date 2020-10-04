'use strict';

(() => {
  const MIN_NAME_LENGTH = 2;
  const MAX_NAME_LENGTH = 25;

  const setup = document.querySelector(`.setup`);
  const setupOpen = document.querySelector(`.setup-open`);
  const setupClose = setup.querySelector(`.setup-close`);
  const userNameInput = document.querySelector(`.setup-user-name`);

  const onSetupEscPress = (evt) => {
    if (evt.key === `Escape` && userNameInput !== document.activeElement) {
      evt.preventDefault();
      closePopup(setup);
    }
  };

  const openPopup = () => {
    setup.classList.remove(`hidden`);
    document.addEventListener(`keydown`, onSetupEscPress);
  };

  const closePopup = () => {
    setup.classList.add(`hidden`);
    document.removeEventListener(`keydown`, onSetupEscPress);
  };

  const validateUserName = () => {
    const valueLength = userNameInput.value.length;

    if (valueLength < MIN_NAME_LENGTH) {
      userNameInput.setCustomValidity(`Еще ${MIN_NAME_LENGTH - valueLength} символов`);
    } else if (valueLength > MAX_NAME_LENGTH) {
      userNameInput.setCustomValidity(`Удалите лишние ${valueLength - MAX_NAME_LENGTH} символов`);
    } else {
      userNameInput.setCustomValidity(``);
    }

    userNameInput.reportValidity();
  };

  setupOpen.addEventListener(`click`, () => {
    openPopup();
  });

  setupOpen.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      evt.preventDefault();
      openPopup();
    }
  });

  setupClose.addEventListener(`click`, () => {
    closePopup();
  });

  setupClose.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      evt.preventDefault();
      closePopup();
    }
  });
  userNameInput.addEventListener(`input`, validateUserName);
})();

