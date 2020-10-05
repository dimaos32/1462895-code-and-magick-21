'use strict';

(() => {

  const MIN_NAME_LENGTH = 2;
  const MAX_NAME_LENGTH = 25;

  const setup = document.querySelector(`.setup`);
  const setupOpen = document.querySelector(`.setup-open`);
  const setupClose = setup.querySelector(`.setup-close`);
  const userNameInput = setup.querySelector(`.setup-user-name`);
  const dialogHandle = setup.querySelector(`.upload`);

  const popapOffset = {
    x: 0,
    y: 0,
  };

  const resetPopapOffset = () => {
    popapOffset.x = 0;
    popapOffset.y = 0;
  };

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
    setup.style = `transform: translateX(-50%);`;
    resetPopapOffset();
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

  dialogHandle.addEventListener(`mousedown`, (evt) => {
    if (evt.button === 0) {
      evt.preventDefault();

      const startCoords = {
        x: evt.clientX - popapOffset.x,
        y: evt.clientY - popapOffset.y,
      };

      let isMoved = false;

      const onMouseMove = (moveEvt) => {
        moveEvt.preventDefault();

        isMoved = true;

        const shift = {
          x: moveEvt.clientX - startCoords.x,
          y: moveEvt.clientY - startCoords.y,
        };

        setup.style = `transform: translate(calc(-50% + ${shift.x}px), ${shift.y}px)`;

        popapOffset.x = shift.x;
        popapOffset.y = shift.y;
      };

      const onMouseUp = (upEvt) => {
        upEvt.preventDefault();

        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);

        startCoords.x = upEvt.clientX;
        startCoords.y = upEvt.clientY;

        if (isMoved) {
          const onDialogHandleClick = (clickEvt) => {
            clickEvt.preventDefault();
            dialogHandle.removeEventListener(`click`, onDialogHandleClick);
          };

          dialogHandle.addEventListener(`click`, onDialogHandleClick);
        }
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    }
  });

})();

